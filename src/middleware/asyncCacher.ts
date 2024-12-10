const catchAsync = fun => (req, res, next) => fun(req, res, next).catch(next);
export default catchAsync;