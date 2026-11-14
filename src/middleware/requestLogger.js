const requestLogger = (req, res, next) => {
	console.log({
		method: req.method,
		url: req.url,
		timestamp: new Date().toISOString(),
	});
	next();
};
export default requestLogger;
