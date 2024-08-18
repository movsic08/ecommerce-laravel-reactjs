import DefaultUserIcon from "../../../assets/img/default_user_profile.png";
import StarRating from "@/Components/StarRating";

export default function ReviewComponent({ data }) {
    return (
        <>
            <div className="bg-white m-1 rounded-md p-3">
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-1 items-center">
                        {" "}
                        <img
                            className="h-8 w-8 rounded-full"
                            src={DefaultUserIcon}
                            alt=""
                        />{" "}
                        Elmer{" "}
                    </div>
                    <StarRating rating={4} />
                </div>
                <p className=" text-sm my-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam sint voluptatibus tenetur dicta vitae velit
                    delectus quia, atque deleniti sunt voluptates facilis,
                    reprehenderit perferendis sed consequuntur quisquam
                    asperiores ipsa maxime?
                </p>
            </div>
        </>
    );
}
