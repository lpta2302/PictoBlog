export default function Title({
  imageUrl,
  title,
}) {
  return (
    <div className="padding-x w-full sm:mb-8 mb-4">
      <div className="flex-start w-full lg:gap-4 gap-2 py-4 border-b border-primary">
        <img
          src={imageUrl}
          alt="title-image"
          className="dark:make-white
              sm:w-10 sm:h-10 w-8 h-8"
        />
        <h1 className="flex-1 sm:text-2xl font-semibold font-system text-primary-1 dark:text-white">
          {title}
        </h1>
      </div>
    </div>
  );
}
