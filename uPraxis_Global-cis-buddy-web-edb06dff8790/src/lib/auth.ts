import { jwtVerify } from 'jose';

// interface UserJwtPayload {}

export const getJwtSecretKey = () => {
  // const secret = process.env.JWT_SECRET_KEY;
  const secret =
    '1sI5sYwee2yqiLfafx8mb1fr+Zaojnc8jAgp4hPh+fjoc01ddzoGA2E6H3kLl25HNP0mJp3XIlgteKq3y3D87uU=';

  if (secret?.length === 0 || secret?.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));

    if (verified.payload?.sub === 'admin') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('Your token has expired');
  }
};
