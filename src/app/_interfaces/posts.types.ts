
export type PostType = {
  id: string,
  body: string,
  image: string,
  createdAt:string,

  comments:CommentType[],
  user: UserType,
};

export type UserType = {
  id:string,
  name:string,
  photo: string,
};

export type CommentType = {
    _id: string,
    content: string,
    commentCreator: UserType,
    post: string,
    createdAt: string,
}
