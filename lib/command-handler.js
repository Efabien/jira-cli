module.exports = (arg, operations) => {
  const func = operations[arg.subCmd];
  if (!func) return logger.error(`Invalide sub-commande ${arg.subCmd}`);
  return func(arg);
};
