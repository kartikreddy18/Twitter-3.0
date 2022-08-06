export const resolve_url = (link: string): string => {
  if (link.startsWith("ipfs://")) {
    link.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs");
  }
  return link;
};
