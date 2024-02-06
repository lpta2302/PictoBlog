import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context";

import TextField from "../input/TextField";
import Loader from "./Loader";

export default function CreateCard({
  currentUser,
}) {
  return (
    <NavLink to={"create-post"}>
      <div
        className="flex-center gap-2 flex-1 dark:bg-dark-item
        bg-white shadow-primary sm:rounded-xl p-2"
      >
        {!currentUser ? (
          <div className="flex-center w-11 h-11">
            <Loader />
          </div>
        ) : (
          <div className="rounded-full overflow-hidden w-12 h-12">
            <img
              src={currentUser.imageUrl}
              alt="avatar"
              className="object-cover w-12 h-12"
            />
          </div>
        )}
        <div className="flex-1">
          <TextField
            id="caption"
            name="caption"
            placeholder="How do you feel now?"
            rounded="rounded-full"
          />
        </div>
      </div>
    </NavLink>
  );
}
