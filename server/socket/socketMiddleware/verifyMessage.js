const verifyMessage = (packet, next) => {
    if (packet[0] !== 'message') return next();

    const { msg, room } = packet[1];
    if (!msg || !room) return next(new Error(`Missing Fields:${(!msg ? ' msg' : '')}${(!room ? ' room' : '')}`));
    next();
};

module.exports = verifyMessage;