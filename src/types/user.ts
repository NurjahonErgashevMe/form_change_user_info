interface IUser {
  nickname: string;
  name: string;
  email: string;
  phone: string;
  surname: string;
  sex: "man" | "woman";
  advantages: string[] | null;
  checkbox: {
    first: NonNullable<boolean | undefined>;
    second: NonNullable<boolean | undefined>;
    third: NonNullable<boolean | undefined>;
  };
  radio: string;
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
