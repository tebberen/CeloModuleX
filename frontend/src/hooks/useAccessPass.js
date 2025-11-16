import { useEffect, useState } from "react";
import { hasNFT } from "../services/blockchain.js";
import { useWallet } from "./useWallet.js";

export function useAccessPass() {
  const { provider, address } = useWallet();
  const [hasPass, setHasPass] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!provider || !address) {
        setHasPass(false);
        return;
      }
      const result = await hasNFT(provider, address);
      setHasPass(result);
    };
    fetchStatus();
  }, [provider, address]);

  return hasPass;
}
