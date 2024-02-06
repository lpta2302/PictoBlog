import { addPost } from "../../../public/assets/icons";
import {
  PostForm,
  Title,
} from "../../components";
import { useCreatePost } from "../../lib/react-query/queries";

export default function Create() {
  return (
    <div className="flex flex-col gap-4 max-w-[720px]">
      <Title
        imageUrl={addPost}
        title={"Create Post"}
      />
      <div className="padding-x">
        <PostForm
          action={{
            ...useCreatePost(),
            type: "CREATE",
          }}
        />
      </div>
    </div>
  );
}
