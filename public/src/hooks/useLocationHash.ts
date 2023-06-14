import { useEffect, useState } from "react";

export interface QueryParam {
  [key: string]: string;
}

const useLocationHash = () => {
  const [hash, setHash] = useState<string | undefined>();

  useEffect(() => {
    if (!hash && window.location) {
      const { hash } = window.location;
      // substring(1) to remove "#" character
      setHash(hash.substring(1));
    }
  }, [hash]);

  return hash;
};

export default useLocationHash;
