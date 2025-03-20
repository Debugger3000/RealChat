


export type userData = {
    user: {
        _id: string;
        username: string;
        bio: string;
        age: number;
        email: string;
        password: string;
        // country: string | null | undefined;
        // gender: string | null | undefined;
        friendRequests: string[];
        friends: string[];
        __v: number;
    }
  } | null;