import {NextFunction, Request, Response} from 'express';

const handleUncaughtErrors = () => {
  process.on(
    'uncaughtException',
    (error: Error, _: Request, response: Response, next: NextFunction) => {
      // Replace with a logging library
      console.error(error.message);

      response.status(500).send('Something went wrong');
      next();
    },
  );

  process.on(
    'unhandledRejection',
    (error: Error, _: Request, response: Response, next: NextFunction) => {
      // Replace with a logging library
      console.error(error.message);

      response.status(500).send('Something went wrong');
      next();
    },
  );
};

export default handleUncaughtErrors;
