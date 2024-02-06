import { edit } from "../../../public/assets/icons";
import {
  PostForm,
  Title,
} from "../../components";
import {
  useGetPostById,
  useUpdatePost,
} from "../../lib/react-query/queries";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id: postId } = useParams();

  const { data: recentPost } =
    useGetPostById(postId);

  return (
    <div className="flex flex-col gap-4 max-w-[720px]">
      <Title
        imageUrl={edit}
        title={"Edit post"}
      />
      <div className="padding-x">
        <PostForm
          post={recentPost}
          action={{
            ...useUpdatePost(),
            type: "UPDATE",
          }}
        />
      </div>
    </div>
  );
}
