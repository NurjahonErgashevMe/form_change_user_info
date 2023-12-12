interface IUser {
  nickname: string;
  name: string;
  surname: string;
  sex: "man" | "woman";
  advantages: string[];
  checkbox: number[];
  radio: number;
  about: string;
  social_media?: {
    title:
      | "telegram"
      | "instagram"
      | "linkedin"
      | "youtube"
      | "github"
      | "facebook"
      | "vk";
    referance: string;
  }[];
}

export type { IUser };
