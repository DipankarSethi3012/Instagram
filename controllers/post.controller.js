import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";


// Add New Post Controller
export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        console.log(caption.toString())
        const image = req.file;
        const authorId = req.id;

        if (!image) return res.status(400).json({ message: 'Image required' });

        // image upload 
        // /optimizing our image to a specified quality because what if user has uploaded very high quality image that our system doesn't support so to overcome this problem we are optimizing our image

        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();


             //sharp(image.buffer) -> this intilizites a sharp object which takes a image buffer
        //image.buffer is actually a raw data that comes from the file that has been uploaded

        //resize({width : 800, heigth : 800, fit : inside}) -> this method resizes the image to fit within a specified dimensions
        // width : 800, height : 800 -> they specified the maximum width and height of the resized image. This image will be scaled down to fit within dimernsions while maintaing the  aspect ratio

        //aspect ratio= width/height 
        //in our case aspect ratio is 1:1

        //fit("inside") -> this option ensues that entire image is sacles down wil get fit in given dimenions  without cropping , both the dimensions will be equal to or less than 800 pixels

        //toformat - is a method from sharp library used to specify the format of our image as well as options for our output image

        // .toformat('jpeg') ->this method converts the file to jpeg format jpeg(Joint photographics experts group)

        // why jpeg?
        //because jpeg uses lossy converison means some data is lost during the compression. this results in smaller file size but can introduce artificats(bluriness vgera aisa kuch)
        // ans it's widely supported and well suited for photographs and jpeg compression reduces file size which helps in saving bandwidth and reducing size space

        //qualiy('80') is used to set the quality of our image
        //Higher Quality (e.g., 90 or 100): Results in better image quality but larger file sizes.
        //Lower Quality (e.g., 70 or 80): Results in reduced image quality but smaller file sizes.
        // A setting of 80 is often used to achieve a good balance between quality and file size.


        //.tobuffer() -> this methods converts our processed image data into the buffer object . this buffer represnts the binary data for the image after all the operations wwe have applied


        //why we convet the image into buffer again?
        //ans.) converting the image into buffer proviedes a verstaile way to handle imagae data in memory.
        //It facilitates storage, transmission, and further processing, and is a common practice in modern web and data handling workflows.


        // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;

         //this converts the data uri from the optimizedBuffer

        //.toString('base64') -> this method converts the binary image data contained in optimized buffer into a base64 encoded string . base64 represents the binary data as a text string , which is useful for embedding binary data as  text string , which is useful for embedding binary data directly into text based formats like html and css

        //data:image/jpeg;base64 -> this constructs a data uri scheme . a data uri is the way to include data directly into webpages or documents

        //Suppose you have an optimizedImageBuffer containing image data after processing. The code snippet converts this image data into a Data URI, which can be used directly in web pages or applications.
        //example  <img src="${fileUri}" alt="Optimized Image" />

        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
            console.log("user updated post added to user posts")
        } 

        await post.populate({ path: 'author', select: '-password' });
         //populate() is a mongoose method used to replace specified field in a document with the actual data from the the refrenced documnet 
        //in our case This ensures that the post document is fully populated with the referenced data before moving on.


        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        })

    } catch (error) {
        console.log(error);
        console.error(err.message);

        return res.status(500).json(
            {
                success : false,
                error : err.message,
                message : "Unable to add post to user"
            }
        )
    }
}

//yha sirf hmari posts ayyengi jaisa ki ye mri profile hai bs
//suppose if main log-in honn to sirf meri posthi display hoeyngi
export const getUserPost = async (req, res) => {
    try {

        const authorId = req.id;
        const posts = (await Post.find({
                author: authorId
            }).sort({
                createdAt: -1
            })).populate({
                path: 'author',
                select: 'username  profilePicture'
            })
            .populate({
                path: 'comments',
                sort: {
                    createdAt: -1 //latest appears first
                },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });

        console.log("apni posst fetched successfully");
        res.status(200).json({
            success: true,
            message: "posts fetched , user ki",
            posts
        })
    } catch (err) {
        console.log("An error occured while fetching the posts of the some otheruser");
        console.error(err.message);

        res.status(500).json({ //internal server error
            success: false,
            message: "unable to fetch the posts of the user"
        })
    }
}

//post ko like kr rhe hai

export const likePost = async (req, res) => {
    try {
        const likeKrneWala = req.id; //jo login hai wohi like krega

        // Get the ID of the post from the request parameters
        const postId = req.params.id;

        // Find the post in the database by its ID
        const post = await Post.findById(postId);

        if (!post) {
            console.log("Post not found, cannot like");
            return res.status(404).json({
                success: false,
                message: "Post not present, unable to like post"
            });
        }

        // Use the $addToSet operator to add the user's ID to the likes array if it's not already present
        await Post.updateOne({
            $addToSet: {
                likes: likeKrneWala
            }
        }); //{ _id: postId }, 
        //addToSet is similar to hashset in java it only takes distinct values if one user is liking one post multiple times only one like is counted

        await post.save(); // savng the upated post 

        //socket-io implementtaion for rel-time notification




        // Send a success response if the like was added successfully
        return res.status(200).json({
            success: true,
            message: "Post liked successfully"
        });
    } catch (err) {
        // If an error occurs, log the error and send a 500 response with an error message
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while trying to like the post"
        });
    }
};

//diskile kr rhe hai
export const dislikePost = async (req, res) => {

    try {
        const disLikeKrneWaleKiID = req.id; //agr dislike kr hai to login hoga so we are fetching it from request ki id se
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            console.log("unable tp find the post for disliking");
            return res.status(404).json({
                success: false,
                message: "post not found, unable to dislike"
            })
        }

        await Post.updateOne({
            $pull: {
                likes: disLikeKrneWaleKiID
            }
        });
        //deleteing likes from like array
        await post.save(); // saving the post


        res.status(200).json({
            success: true,
            message: "Post disliked successfully"
        });
    } catch (err) {
        console.log("An error has been occurred while disliking the post");
        console.error(err.message);

        return res.status(500).json({
            success: false,
            message: "unable to dislike the post",
            error: err.message
        })
    }

}

//commenting add kr rhe hai
export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentKrneWala = req.id;

        const {
            text
        } = req.body;
        const post = await Post.findOne(postId);

        if (!text) {
            console.log("unable to find comment");
            return res.status(404).json({
                success: false,
                message: "comment not found"
            })
        }

        if (!post) {
            console.log("Unable to find post for doing comment");
            return res.status(404).json({
                success: false,
                message: "Post not found, unable to comment"
            })
        }

        const comment = await Comment.create({ //creating a comment
            text,
            author: commentKrneWala,
            post: postId

        }).populate({
            path: 'author',
            select: 'username, profilePicture'
        }) //populating to see who has commented with his/her profilepicture

        //adding comment to post
        post.comments.push(comment._id);
        await post.save();

        console.log("comment added to post successfully");

        res.status(201).json({
            success: true,
            comment,
            message: "Comment has been added to post successfully"
        })

    } catch (err) {
        console.log("an error has been occured while commenting on the post");
        console.error(err.message);

        return res.status(500).json({
            success: false,
            message: "Unable comment on the post",
            error: err.message
        })
    }

}


//fetching all the comments of a particular post

export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const comments = await Post.find({
            post: postId
        }).populate('author', 'username', 'profilePicture')

        if (!comments) {
            console.log("No comments in the post");
            return res.status(404).json({
                success: false,
                message: "No comments avaible for this post"
            });
        }

        console.log("comments fetched successfully");
        console.log(comments);

        res.status(201).json({
            success: true,
            message: "Comments for the mentioned post fetched successfully",
            comments
        })
    } catch (error) {
        console.log("An error has been occured while fetching the comments");
        console.error(err.message);

        res.status(500).json({
            success: false,
            error: err.message,
            message: "An error has been occured while fetching the commenst for a particular post"

        })
    }
}

//deleteing a post

export const deletePost = async (req, res) => {
    try {

        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);

        if (!post) {
            console.log("unable to find the post for deleting");

            return res.status(401).json({
                success: false,
                message: "Unable to find the post for deletion"
            })
        }

        //checking if logged-in user is owner of the post or not
        if (post.author.toString() !== authorId) { //convertig it into string beacuse it returns a object
            console.log("Id not match unable to delet the post");

            return res.status(403).json({ //403 means client doesnt have specified permissions for the work he is accessing to attempt
                success: false,
                message: "Unauthorized user unable to delete the post"
            })
        }


        await Post.findByIdAndDelete(postId); //deleting the post

        //if we delete a post .. the post is deleted but the post id is remaning in our database so we also have to delete it oherwise it gill give error when we displaying our posts
        //if we ignore it our whole code crashes

        //removing the post id from user's post

        const user = await User.findById(authorId);

        //posts isan array so we can use filetr method
        user.posts = user.posts.filter(id => id.toString() != postId);
        //it will give all the posts from the user expect the deleted post 

        await user.save();


        //delete assosiated comments

        await Comment.deleteMany({
            post: postId
        });
        // This will delete all comments that have a post field equal to postId.
        console.log("All commenst deleted for the deleted post");

        res.status(200).json({
            success: true,
            message: "Post successfully deleted as well as all relevent things releated to it deleted"
        })

    } catch (error) {
        console.log(error);
        console.error(err.message);

        return res.status(500).json({
            success: false,
            message: "Unable to delete the post"
        })
    }
}


//bookmark controller
//for this we need two things the post that to be bookmarked and who is bookmarking the post
export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id; //lgon honge already

        const user = await User.findById(authorId);
        const post = Post.findById(postId);

        if (!post) {
            console.log("Unable to find the post to be bookmarked");
            return res.status(404).json({
                success: false,
                message: "Unable to find the post to be bookMarked"
            })
        }

        if (user.bookmarks.includes(post._id)) { //checking if post is already bookamrks or not
            //inludes function is ude to check if something is present in arraty or not
            await User.updateOne({$pull :{bookmarks : post._id}});
            await User.save();
            console.log("Post unsaved successfully");

            return res.status(200).json({
                success : true,
                type : 'unsaved', //this helps in front-end   
                // In the frontend, we can use the type field to trigger specific actions or behaviors
                message : 'Post unbookmarked successfully'
            })
        } else{ //now we are saving the post
            //inludes function is ude to check if something is present in arraty or not
            await User.updateOne({$addToSet :{bookmarks : post._id}}); //a user can book mark only one post one time
            await User.save();
            console.log("Post saved successfully");
        }

    } catch (err) {

    }
}
