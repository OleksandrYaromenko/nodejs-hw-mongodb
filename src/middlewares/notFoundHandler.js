


export default function notFoundHandler(req, res, next) {
   return res.status(404).json({
      status: 404,
      message: 'Route not found',
    });
  }
