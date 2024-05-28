export class Reviews {
  id: string;
  content: string;
  score: number;
  first_user_id: string;
  second_user_id: string;

  constructor(
    id: string,
    content: string,
    score: number,
    get_user_id: string,
    give_user_id: string
  ) {
    this.id=id;
    this.content=content;
    this.score=score;
    this.first_user_id=get_user_id;
    this.second_user_id=give_user_id;
  }
}
