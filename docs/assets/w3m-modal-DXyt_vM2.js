import{N as b,w as _e,t as Be,R as p,S as v,b as de,c as z,E as M,u as ue,v as pe,n as f,B as Z,a as ye,y as J,z as te,D as Ye,l as Te,F as Xe,C as me,G as Ue,I as ze,M as R,J as Fe,d as A,r as se,i as x,x as l,h as Le,K as he,g as ke,e as qe,L as Y,O as y,s as He,A as le,T as Qe,P as Ze}from"./core-DKVhzpCZ.js";import{c as T,n as m,o as O,r as h,U as je}from"./index-Cp_RxaPf.js";import"./index-CvszuOpk.js";const j={getGasPriceInEther(e,t){const o=t*e;return Number(o)/1e18},getGasPriceInUSD(e,t,o){const i=j.getGasPriceInEther(t,o);return b.bigNumber(e).times(i).toNumber()},getPriceImpact({sourceTokenAmount:e,sourceTokenPriceInUSD:t,toTokenPriceInUSD:o,toTokenAmount:i}){const a=b.bigNumber(e).times(t),n=b.bigNumber(i).times(o);return a.minus(n).div(a).times(100).toNumber()},getMaxSlippage(e,t){const o=b.bigNumber(e).div(100);return b.multiply(t,o).toNumber()},getProviderFee(e,t=.0085){return b.bigNumber(e).times(t).toString()},isInsufficientNetworkTokenForGas(e,t){const o=t||"0";return b.bigNumber(e).eq(0)?!0:b.bigNumber(b.bigNumber(o)).gt(e)},isInsufficientSourceTokenForSwap(e,t,o){var n,s;const i=(s=(n=o==null?void 0:o.find(c=>c.address===t))==null?void 0:n.quantity)==null?void 0:s.numeric;return b.bigNumber(i||"0").lt(e)}},We=15e4,Je=6,S={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:Te.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},r=Be({...S}),we={state:r,subscribe(e){return ze(r,()=>e(r))},subscribeKey(e,t){return Ue(r,e,t)},getParams(){var d,w,g,P,E,F,L,H,Q;const e=f.state.activeChain,t=((d=f.getAccountData(e))==null?void 0:d.caipAddress)??f.state.activeCaipAddress,o=ye.getPlainAddress(t),i=Xe(),a=me.getConnectorId(f.state.activeChain);if(!o)throw new Error("No address found to swap the tokens from.");const n=!((w=r.toToken)!=null&&w.address)||!((g=r.toToken)!=null&&g.decimals),s=!((P=r.sourceToken)!=null&&P.address)||!((E=r.sourceToken)!=null&&E.decimals)||!b.bigNumber(r.sourceTokenAmount).gt(0),c=!r.sourceTokenAmount;return{networkAddress:i,fromAddress:o,fromCaipAddress:t,sourceTokenAddress:(F=r.sourceToken)==null?void 0:F.address,toTokenAddress:(L=r.toToken)==null?void 0:L.address,toTokenAmount:r.toTokenAmount,toTokenDecimals:(H=r.toToken)==null?void 0:H.decimals,sourceTokenAmount:r.sourceTokenAmount,sourceTokenDecimals:(Q=r.sourceToken)==null?void 0:Q.decimals,invalidToToken:n,invalidSourceToken:s,invalidSourceTokenAmount:c,availableToSwap:t&&!n&&!s&&!c,isAuthConnector:a===z.CONNECTOR_ID.AUTH}},async setSourceToken(e){if(!e){r.sourceToken=e,r.sourceTokenAmount="",r.sourceTokenPriceInUSD=0;return}r.sourceToken=e,await u.setTokenPrice(e.address,"sourceToken")},setSourceTokenAmount(e){r.sourceTokenAmount=e},async setToToken(e){if(!e){r.toToken=e,r.toTokenAmount="",r.toTokenPriceInUSD=0;return}r.toToken=e,await u.setTokenPrice(e.address,"toToken")},setToTokenAmount(e){r.toTokenAmount=e?b.toFixed(e,Je):""},async setTokenPrice(e,t){let o=r.tokensPriceMap[e]||0;o||(r.loadingPrices=!0,o=await u.getAddressPrice(e)),t==="sourceToken"?r.sourceTokenPriceInUSD=o:t==="toToken"&&(r.toTokenPriceInUSD=o),r.loadingPrices&&(r.loadingPrices=!1),u.getParams().availableToSwap&&!r.switchingTokens&&u.swapTokens()},async switchTokens(){if(!(r.initializing||!r.initialized||r.switchingTokens)){r.switchingTokens=!0;try{const e=r.toToken?{...r.toToken}:void 0,t=r.sourceToken?{...r.sourceToken}:void 0,o=e&&r.toTokenAmount===""?"1":r.toTokenAmount;u.setSourceTokenAmount(o),u.setToTokenAmount(""),await u.setSourceToken(e),await u.setToToken(t),r.switchingTokens=!1,u.swapTokens()}catch(e){throw r.switchingTokens=!1,e}}},resetState(){r.myTokensWithBalance=S.myTokensWithBalance,r.tokensPriceMap=S.tokensPriceMap,r.initialized=S.initialized,r.initializing=S.initializing,r.switchingTokens=S.switchingTokens,r.sourceToken=S.sourceToken,r.sourceTokenAmount=S.sourceTokenAmount,r.sourceTokenPriceInUSD=S.sourceTokenPriceInUSD,r.toToken=S.toToken,r.toTokenAmount=S.toTokenAmount,r.toTokenPriceInUSD=S.toTokenPriceInUSD,r.networkPrice=S.networkPrice,r.networkTokenSymbol=S.networkTokenSymbol,r.networkBalanceInUSD=S.networkBalanceInUSD,r.inputError=S.inputError},resetValues(){var o;const{networkAddress:e}=u.getParams(),t=(o=r.tokens)==null?void 0:o.find(i=>i.address===e);u.setSourceToken(t),u.setToToken(void 0)},getApprovalLoadingState(){return r.loadingApprovalTransaction},clearError(){r.transactionError=void 0},async initializeState(){if(!r.initializing){if(r.initializing=!0,!r.initialized)try{await u.fetchTokens(),r.initialized=!0}catch{r.initialized=!1,v.showError("Failed to initialize swap"),p.goBack()}r.initializing=!1}},async fetchTokens(){var o;const{networkAddress:e}=u.getParams();await u.getNetworkTokenPrice(),await u.getMyTokensWithBalance();const t=(o=r.myTokensWithBalance)==null?void 0:o.find(i=>i.address===e);t&&(r.networkTokenSymbol=t.symbol,u.setSourceToken(t),u.setSourceTokenAmount("0"))},async getTokenList(){var t,o;const e=(t=f.state.activeCaipNetwork)==null?void 0:t.caipNetworkId;if(!(r.caipNetworkId===e&&r.tokens))try{r.tokensLoading=!0;const i=await J.getTokenList(e);r.tokens=i,r.caipNetworkId=e,r.popularTokens=i.sort((d,w)=>d.symbol<w.symbol?-1:d.symbol>w.symbol?1:0);const n=(e&&((o=Te.SUGGESTED_TOKENS_BY_CHAIN)==null?void 0:o[e])||[]).map(d=>i.find(w=>w.symbol===d)).filter(d=>!!d),c=(Te.SWAP_SUGGESTED_TOKENS||[]).map(d=>i.find(w=>w.symbol===d)).filter(d=>!!d).filter(d=>!n.some(w=>w.address===d.address));r.suggestedTokens=[...n,...c]}catch{r.tokens=[],r.popularTokens=[],r.suggestedTokens=[]}finally{r.tokensLoading=!1}},async getAddressPrice(e){var d,w;const t=r.tokensPriceMap[e];if(t)return t;const o=await Z.fetchTokenPrice({addresses:[e]}),i=(o==null?void 0:o.fungibles)||[],a=[...r.tokens||[],...r.myTokensWithBalance||[]],n=(d=a==null?void 0:a.find(g=>g.address===e))==null?void 0:d.symbol,s=((w=i.find(g=>g.symbol.toLowerCase()===(n==null?void 0:n.toLowerCase())))==null?void 0:w.price)||0,c=parseFloat(s.toString());return r.tokensPriceMap[e]=c,c},async getNetworkTokenPrice(){var a;const{networkAddress:e}=u.getParams(),o=(a=(await Z.fetchTokenPrice({addresses:[e]}).catch(()=>(v.showError("Failed to fetch network token price"),{fungibles:[]}))).fungibles)==null?void 0:a[0],i=(o==null?void 0:o.price.toString())||"0";r.tokensPriceMap[e]=parseFloat(i),r.networkTokenSymbol=(o==null?void 0:o.symbol)||"",r.networkPrice=i},async getMyTokensWithBalance(e){const t=await Ye.getMyTokensWithBalance(e),o=J.mapBalancesToSwapTokens(t);o&&(await u.getInitialGasPrice(),u.setBalances(o))},setBalances(e){const{networkAddress:t}=u.getParams(),o=f.state.activeCaipNetwork;if(!o)return;const i=e.find(a=>a.address===t);e.forEach(a=>{r.tokensPriceMap[a.address]=a.price||0}),r.myTokensWithBalance=e.filter(a=>a.address.startsWith(o.caipNetworkId)),r.networkBalanceInUSD=i?b.multiply(i.quantity.numeric,i.price).toString():"0"},async getInitialGasPrice(){var t,o;const e=await J.fetchGasPrice();if(!e)return{gasPrice:null,gasPriceInUSD:null};switch((o=(t=f.state)==null?void 0:t.activeCaipNetwork)==null?void 0:o.chainNamespace){case z.CHAIN.SOLANA:return r.gasFee=e.standard??"0",r.gasPriceInUSD=b.multiply(e.standard,r.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(r.gasFee),gasPriceInUSD:Number(r.gasPriceInUSD)};case z.CHAIN.EVM:default:const i=e.standard??"0",a=BigInt(i),n=BigInt(We),s=j.getGasPriceInUSD(r.networkPrice,n,a);return r.gasFee=i,r.gasPriceInUSD=s,{gasPrice:a,gasPriceInUSD:s}}},async swapTokens(){var n,s,c;const e=(n=f.getAccountData())==null?void 0:n.address,t=r.sourceToken,o=r.toToken,i=b.bigNumber(r.sourceTokenAmount).gt(0);if(i||u.setToTokenAmount(""),!o||!t||r.loadingPrices||!i||!e)return;r.loadingQuote=!0;const a=b.bigNumber(r.sourceTokenAmount).times(10**t.decimals).round(0);try{const d=await Z.fetchSwapQuote({userAddress:e,from:t.address,to:o.address,gasPrice:r.gasFee,amount:a.toString()});r.loadingQuote=!1;const w=(c=(s=d==null?void 0:d.quotes)==null?void 0:s[0])==null?void 0:c.toAmount;if(!w){te.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");return}const g=b.bigNumber(w).div(10**o.decimals).toString();u.setToTokenAmount(g),u.hasInsufficientToken(r.sourceTokenAmount,t.address)?r.inputError="Insufficient balance":(r.inputError=void 0,u.setTransactionDetails())}catch(d){const w=await J.handleSwapError(d);r.loadingQuote=!1,r.inputError=w||"Insufficient balance"}},async getTransaction(){const{fromCaipAddress:e,availableToSwap:t}=u.getParams(),o=r.sourceToken,i=r.toToken;if(!(!e||!t||!o||!i||r.loadingQuote))try{r.loadingBuildTransaction=!0;const a=await J.fetchSwapAllowance({userAddress:e,tokenAddress:o.address,sourceTokenAmount:r.sourceTokenAmount,sourceTokenDecimals:o.decimals});let n;return a?n=await u.createSwapTransaction():n=await u.createAllowanceTransaction(),r.loadingBuildTransaction=!1,r.fetchError=!1,n}catch{p.goBack(),v.showError("Failed to check allowance"),r.loadingBuildTransaction=!1,r.approvalTransaction=void 0,r.swapTransaction=void 0,r.fetchError=!0;return}},async createAllowanceTransaction(){const{fromCaipAddress:e,sourceTokenAddress:t,toTokenAddress:o}=u.getParams();if(!(!e||!o)){if(!t)throw new Error("createAllowanceTransaction - No source token address found.");try{const i=await Z.generateApproveCalldata({from:t,to:o,userAddress:e}),a=ye.getPlainAddress(i.tx.from);if(!a)throw new Error("SwapController:createAllowanceTransaction - address is required");const n={data:i.tx.data,to:a,gasPrice:BigInt(i.tx.eip155.gasPrice),value:BigInt(i.tx.value),toAmount:r.toTokenAmount};return r.swapTransaction=void 0,r.approvalTransaction={data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount},{data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount}}catch{p.goBack(),v.showError("Failed to create approval transaction"),r.approvalTransaction=void 0,r.swapTransaction=void 0,r.fetchError=!0;return}}},async createSwapTransaction(){var s;const{networkAddress:e,fromCaipAddress:t,sourceTokenAmount:o}=u.getParams(),i=r.sourceToken,a=r.toToken;if(!t||!o||!i||!a)return;const n=(s=de.parseUnits(o,i.decimals))==null?void 0:s.toString();try{const c=await Z.generateSwapCalldata({userAddress:t,from:i.address,to:a.address,amount:n,disableEstimate:!0}),d=i.address===e,w=BigInt(c.tx.eip155.gas),g=BigInt(c.tx.eip155.gasPrice),P=ye.getPlainAddress(c.tx.to);if(!P)throw new Error("SwapController:createSwapTransaction - address is required");const E={data:c.tx.data,to:P,gas:w,gasPrice:g,value:BigInt(d?n??"0":"0"),toAmount:r.toTokenAmount};return r.gasPriceInUSD=j.getGasPriceInUSD(r.networkPrice,w,g),r.approvalTransaction=void 0,r.swapTransaction=E,E}catch{p.goBack(),v.showError("Failed to create transaction"),r.approvalTransaction=void 0,r.swapTransaction=void 0,r.fetchError=!0;return}},onEmbeddedWalletApprovalSuccess(){v.showLoading("Approve limit increase in your wallet"),p.replace("SwapPreview")},async sendTransactionForApproval(e){var a,n,s;const{fromAddress:t,isAuthConnector:o}=u.getParams();r.loadingApprovalTransaction=!0,o?p.pushTransactionStack({onSuccess:u.onEmbeddedWalletApprovalSuccess}):v.showLoading("Approve limit increase in your wallet");try{await de.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:z.CHAIN.EVM}),await u.swapTokens(),await u.getTransaction(),r.approvalTransaction=void 0,r.loadingApprovalTransaction=!1}catch(c){const d=c;r.transactionError=d==null?void 0:d.displayMessage,r.loadingApprovalTransaction=!1,v.showError((d==null?void 0:d.displayMessage)||"Transaction error"),M.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:(d==null?void 0:d.displayMessage)||(d==null?void 0:d.message)||"Unknown",network:((a=f.state.activeCaipNetwork)==null?void 0:a.caipNetworkId)||"",swapFromToken:((n=u.state.sourceToken)==null?void 0:n.symbol)||"",swapToToken:((s=u.state.toToken)==null?void 0:s.symbol)||"",swapFromAmount:u.state.sourceTokenAmount||"",swapToAmount:u.state.toTokenAmount||"",isSmartAccount:ue(z.CHAIN.EVM)===pe.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(e){var s,c,d,w,g,P,E,F,L,H,Q,Ee;if(!e)return;const{fromAddress:t,toTokenAmount:o,isAuthConnector:i}=u.getParams();r.loadingTransaction=!0;const a=`Swapping ${(s=r.sourceToken)==null?void 0:s.symbol} to ${b.formatNumberToLocalString(o,3)} ${(c=r.toToken)==null?void 0:c.symbol}`,n=`Swapped ${(d=r.sourceToken)==null?void 0:d.symbol} to ${b.formatNumberToLocalString(o,3)} ${(w=r.toToken)==null?void 0:w.symbol}`;i?p.pushTransactionStack({onSuccess(){p.replace("Account"),v.showLoading(a),we.resetState()}}):v.showLoading("Confirm transaction in your wallet");try{const ve=[(g=r.sourceToken)==null?void 0:g.address,(P=r.toToken)==null?void 0:P.address].join(","),$=await de.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:z.CHAIN.EVM});return r.loadingTransaction=!1,v.showSuccess(n),M.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:((E=f.state.activeCaipNetwork)==null?void 0:E.caipNetworkId)||"",swapFromToken:((F=u.state.sourceToken)==null?void 0:F.symbol)||"",swapToToken:((L=u.state.toToken)==null?void 0:L.symbol)||"",swapFromAmount:u.state.sourceTokenAmount||"",swapToAmount:u.state.toTokenAmount||"",isSmartAccount:ue(z.CHAIN.EVM)===pe.ACCOUNT_TYPES.SMART_ACCOUNT}}),we.resetState(),i||p.replace("Account"),we.getMyTokensWithBalance(ve),$}catch(ve){const $=ve;r.transactionError=$==null?void 0:$.displayMessage,r.loadingTransaction=!1,v.showError(($==null?void 0:$.displayMessage)||"Transaction error"),M.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:($==null?void 0:$.displayMessage)||($==null?void 0:$.message)||"Unknown",network:((H=f.state.activeCaipNetwork)==null?void 0:H.caipNetworkId)||"",swapFromToken:((Q=u.state.sourceToken)==null?void 0:Q.symbol)||"",swapToToken:((Ee=u.state.toToken)==null?void 0:Ee.symbol)||"",swapFromAmount:u.state.sourceTokenAmount||"",swapToAmount:u.state.toTokenAmount||"",isSmartAccount:ue(z.CHAIN.EVM)===pe.ACCOUNT_TYPES.SMART_ACCOUNT}});return}},hasInsufficientToken(e,t){return j.isInsufficientSourceTokenForSwap(e,t,r.myTokensWithBalance)},setTransactionDetails(){const{toTokenAddress:e,toTokenDecimals:t}=u.getParams();!e||!t||(r.gasPriceInUSD=j.getGasPriceInUSD(r.networkPrice,BigInt(r.gasFee),BigInt(We)),r.priceImpact=j.getPriceImpact({sourceTokenAmount:r.sourceTokenAmount,sourceTokenPriceInUSD:r.sourceTokenPriceInUSD,toTokenPriceInUSD:r.toTokenPriceInUSD,toTokenAmount:r.toTokenAmount}),r.maxSlippage=j.getMaxSlippage(r.slippage,r.toTokenAmount),r.providerFee=j.getProviderFee(r.sourceTokenAmount))}},u=_e(we),W=Be({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),et={state:W,subscribe(e){return ze(W,()=>e(W))},subscribeKey(e,t){return Ue(W,e,t)},showTooltip({message:e,triggerRect:t,variant:o}){W.open=!0,W.message=e,W.triggerRect=t,W.variant=o},hide(){W.open=!1,W.message="",W.triggerRect={width:0,height:0,top:0,left:0}}},ee=_e(et),Me={isUnsupportedChainView(){return p.state.view==="UnsupportedChain"||p.state.view==="SwitchNetwork"&&p.state.history.includes("UnsupportedChain")},async safeClose(){if(this.isUnsupportedChainView()){R.shake();return}if(await Fe.isSIWXCloseDisabled()){R.shake();return}(p.state.view==="DataCapture"||p.state.view==="DataCaptureOtpConfirm")&&de.disconnect(),R.close()}},tt=A`
  :host {
    display: block;
    border-radius: clamp(0px, ${({borderRadius:e})=>e[8]}, 44px);
    box-shadow: 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    overflow: hidden;
  }
`;var ot=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let xe=class extends x{render(){return l`<slot></slot>`}};xe.styles=[se,tt];xe=ot([T("wui-card")],xe);const nt=A`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[6]};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};

      wui-icon {
        color: ${({tokens:e})=>e.theme.iconDefault};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderSuccess};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundWarning};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderWarning};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundError};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderError};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e[2]};
    background-color: var(--local-icon-bg-value);
  }
`;var Ae=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};const it={info:"info",success:"checkmark",warning:"warningCircle",error:"warning"};let ne=class extends x{constructor(){super(...arguments),this.message="",this.type="info"}render(){return l`
      <wui-flex
        data-type=${O(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${it[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){te.close()}};ne.styles=[se,nt];Ae([m()],ne.prototype,"message",void 0);Ae([m()],ne.prototype,"type",void 0);ne=Ae([T("wui-alertbar")],ne);const rt=A`
  :host {
    display: block;
    position: absolute;
    top: ${({spacing:e})=>e[3]};
    left: ${({spacing:e})=>e[4]};
    right: ${({spacing:e})=>e[4]};
    opacity: 0;
    pointer-events: none;
  }
`;var Ve=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};const at={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"warning"}};let fe=class extends x{constructor(){super(),this.unsubscribe=[],this.open=te.state.open,this.onOpen(!0),this.unsubscribe.push(te.subscribeKey("open",t=>{this.open=t,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const{message:t,variant:o}=te.state,i=at[o];return l`
      <wui-alertbar
        message=${t}
        backgroundColor=${i==null?void 0:i.backgroundColor}
        iconColor=${i==null?void 0:i.iconColor}
        icon=${i==null?void 0:i.icon}
        type=${o}
      ></wui-alertbar>
    `}onOpen(t){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):t||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};fe.styles=rt;Ve([h()],fe.prototype,"open",void 0);fe=Ve([T("w3m-alertbar")],fe);const st=A`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:e})=>e.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var G=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let D=class extends x{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return l`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${O(this.iconSize)}></wui-icon>
    </button>`}};D.styles=[se,Le,st];G([m()],D.prototype,"icon",void 0);G([m()],D.prototype,"variant",void 0);G([m()],D.prototype,"type",void 0);G([m()],D.prototype,"size",void 0);G([m()],D.prototype,"iconSize",void 0);G([m({type:Boolean})],D.prototype,"fullWidth",void 0);G([m({type:Boolean})],D.prototype,"disabled",void 0);D=G([T("wui-icon-button")],D);const ct=A`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    border-radius: ${({borderRadius:e})=>e[32]};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;var q=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};const lt={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},dt={lg:"lg",md:"md",sm:"sm"};let V=class extends x{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size="lg",this.type="text-dropdown",this.disabled=!1}render(){return l`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`}textTemplate(){const t=lt[this.size];return this.text?l`<wui-text color="primary" variant=${t}>${this.text}</wui-text>`:null}imageTemplate(){if(this.imageSrc)return l`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;const t=dt[this.size];return l` <wui-flex class="left-icon-container">
      <wui-icon size=${t} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}};V.styles=[se,Le,ct];q([m()],V.prototype,"imageSrc",void 0);q([m()],V.prototype,"text",void 0);q([m()],V.prototype,"size",void 0);q([m()],V.prototype,"type",void 0);q([m({type:Boolean})],V.prototype,"disabled",void 0);V=q([T("wui-select")],V);const ut=A`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-down-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-up-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var K=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};const pt=["SmartSessionList"],wt={PayWithExchange:he.tokens.theme.foregroundPrimary};function Ne(){var d,w,g,P,E,F,L,H;const e=(w=(d=p.state.data)==null?void 0:d.connector)==null?void 0:w.name,t=(P=(g=p.state.data)==null?void 0:g.wallet)==null?void 0:P.name,o=(F=(E=p.state.data)==null?void 0:E.network)==null?void 0:F.name,i=t??e,a=me.getConnectors(),n=a.length===1&&((L=a[0])==null?void 0:L.id)==="w3m-email",s=(H=f.getAccountData())==null?void 0:H.socialProvider,c=s?s.charAt(0).toUpperCase()+s.slice(1):"Connect Social";return{Connect:`Connect ${n?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",UsageExceeded:"Usage Exceeded",ConnectingExternal:i??"Connect Wallet",ConnectingWalletConnect:i??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview Convert",Downloads:i?`Get ${i}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a Wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:o??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade Your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose Name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select Token",SwapPreview:"Preview Swap",WalletSend:"Send",WalletSendPreview:"Review Send",WalletSendSelectToken:"Select Token",WalletSendConfirmed:"Confirmed",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a Wallet?",ConnectWallets:"Connect Wallet",ConnectSocials:"All Socials",ConnectingSocial:c,ConnectingMultiChain:"Select Chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch Chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in Progress",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund Wallet",PayWithExchange:"Deposit from Exchange",PayWithExchangeSelectAsset:"Select Asset"}}let _=class extends x{constructor(){super(),this.unsubscribe=[],this.heading=Ne()[p.state.view],this.network=f.state.activeCaipNetwork,this.networkImage=ke.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=p.state.view,this.viewDirection="",this.unsubscribe.push(qe.subscribeNetworkImages(()=>{this.networkImage=ke.getNetworkImage(this.network)}),p.subscribeKey("view",t=>{setTimeout(()=>{this.view=t,this.heading=Ne()[t]},Y.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),f.subscribeKey("activeCaipNetwork",t=>{this.network=t,this.networkImage=ke.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=wt[p.state.view]??he.tokens.theme.backgroundPrimary;return this.style.setProperty("--local-header-background-color",t),l`
      <wui-flex
        .padding=${["0","4","0","4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){M.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),p.push("WhatIsAWallet")}async onClose(){await Me.safeClose()}rightHeaderTemplate(){var o,i,a;const t=(a=(i=(o=y)==null?void 0:o.state)==null?void 0:i.features)==null?void 0:a.smartSessions;return p.state.view!=="Account"||!t?this.closeButtonTemplate():l`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${()=>p.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `}closeButtonTemplate(){return l`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `}titleTemplate(){const t=pt.includes(this.view);return l`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${t?l`<wui-tag variant="accent" size="md">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){var w;const{view:t}=p.state,o=t==="Connect",i=y.state.enableEmbedded,a=t==="ApproveTransaction",n=t==="ConnectingSiwe",s=t==="Account",c=y.state.enableNetworkSwitch,d=a||n||o&&i;return s&&c?l`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${O((w=this.network)==null?void 0:w.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${O(this.networkImage)}
      ></wui-select>`:this.showBack&&!d?l`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`:l`<wui-icon-button
      data-hidden=${!o}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`}onNetworks(){this.isAllowedNetworkSwitch()&&(M.sendEvent({type:"track",event:"CLICK_NETWORKS"}),p.push("Networks"))}isAllowedNetworkSwitch(){const t=f.getAllRequestedCaipNetworks(),o=t?t.length>1:!1,i=t==null?void 0:t.find(({id:a})=>{var n;return a===((n=this.network)==null?void 0:n.id)});return o||!i}onViewChange(){const{history:t}=p.state;let o=Y.VIEW_DIRECTION.Next;t.length<this.prevHistoryLength&&(o=Y.VIEW_DIRECTION.Prev),this.prevHistoryLength=t.length,this.viewDirection=o}async onHistoryChange(){var i;const{history:t}=p.state,o=(i=this.shadowRoot)==null?void 0:i.querySelector("#dynamic");t.length>1&&!this.showBack&&o?(await o.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,o.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):t.length<=1&&this.showBack&&o&&(await o.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,o.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){p.goBack()}};_.styles=ut;K([h()],_.prototype,"heading",void 0);K([h()],_.prototype,"network",void 0);K([h()],_.prototype,"networkImage",void 0);K([h()],_.prototype,"showBack",void 0);K([h()],_.prototype,"prevHistoryLength",void 0);K([h()],_.prototype,"view",void 0);K([h()],_.prototype,"viewDirection",void 0);_=K([T("w3m-header")],_);const mt=A`
  :host {
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${({tokens:e})=>e.theme.borderPrimary};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${({borderRadius:e})=>e.round} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    border-radius: ${({borderRadius:e})=>e.round} !important;
  }
`;var $e=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let ie=class extends x{constructor(){super(...arguments),this.message="",this.variant="success"}render(){return l`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){const t={success:"success",error:"error",warning:"warning",info:"default"},o={success:"checkmark",error:"warning",warning:"warningCircle",info:"info"};return this.variant==="loading"?l`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:l`<wui-icon-box
      size="md"
      color=${t[this.variant]}
      icon=${o[this.variant]}
    ></wui-icon-box>`}};ie.styles=[se,mt];$e([m()],ie.prototype,"message",void 0);$e([m()],ie.prototype,"variant",void 0);ie=$e([T("wui-snackbar")],ie);const ht=He`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var Ge=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let ge=class extends x{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=v.state.open,this.unsubscribe.push(v.subscribeKey("open",t=>{this.open=t,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(t=>t())}render(){const{message:t,variant:o}=v.state;return l` <wui-snackbar message=${t} variant=${o}></wui-snackbar> `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),v.state.autoClose&&(this.timeout=setTimeout(()=>v.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};ge.styles=ht;Ge([h()],ge.prototype,"open",void 0);ge=Ge([T("w3m-snackbar")],ge);const ft=A`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:e})=>e[3]} 10px ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:e})=>e[5]});
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.textPrimary};
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var ce=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let X=class extends x{constructor(){super(),this.unsubscribe=[],this.open=ee.state.open,this.message=ee.state.message,this.triggerRect=ee.state.triggerRect,this.variant=ee.state.variant,this.unsubscribe.push(ee.subscribe(t=>{this.open=t.open,this.message=t.message,this.triggerRect=t.triggerRect,this.variant=t.variant}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){this.dataset.variant=this.variant;const t=this.triggerRect.top,o=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${t}px;
    --w3m-tooltip-left: ${o}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${this.open?1:0};
    `,l`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};X.styles=[ft];ce([h()],X.prototype,"open",void 0);ce([h()],X.prototype,"message",void 0);ce([h()],X.prototype,"triggerRect",void 0);ce([h()],X.prototype,"variant",void 0);X=ce([T("w3m-tooltip")],X);const oe={getTabsByNamespace(e){var o;return!!e&&e===z.CHAIN.EVM?((o=y.state.remoteFeatures)==null?void 0:o.activity)===!1?Y.ACCOUNT_TABS.filter(i=>i.label!=="Activity"):Y.ACCOUNT_TABS:[]},isValidReownName(e){return/^[a-zA-Z0-9]+$/gu.test(e)},isValidEmail(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/gu.test(e)},validateReownName(e){return e.replace(/\^/gu,"").toLowerCase().replace(/[^a-zA-Z0-9]/gu,"")},hasFooter(){var t;const e=p.state.view;if(Y.VIEWS_WITH_LEGAL_FOOTER.includes(e)){const{termsConditionsUrl:o,privacyPolicyUrl:i}=y.state,a=(t=y.state.features)==null?void 0:t.legalCheckbox;return!(!o&&!i||a)}return Y.VIEWS_WITH_DEFAULT_FOOTER.includes(e)}},gt=A`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({spacing:e})=>e[3]};
  }

  a {
    text-decoration: none;
    color: ${({tokens:e})=>e.core.textAccentPrimary};
    font-weight: 500;
  }
`;var Ke=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let be=class extends x{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=y.state.remoteFeatures,this.unsubscribe.push(y.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){var n;const{termsConditionsUrl:t,privacyPolicyUrl:o}=y.state,i=(n=y.state.features)==null?void 0:n.legalCheckbox;return!t&&!o||i?l`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `:l`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4","3","3","3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `}andTemplate(){const{termsConditionsUrl:t,privacyPolicyUrl:o}=y.state;return t&&o?"and":""}termsTemplate(){const{termsConditionsUrl:t}=y.state;return t?l`<a href=${t} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){const{privacyPolicyUrl:t}=y.state;return t?l`<a href=${t} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(t=!1){var o;return(o=this.remoteFeatures)!=null&&o.reownBranding?t?l`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:l`<wui-ux-by-reown></wui-ux-by-reown>`:null}};be.styles=[gt];Ke([h()],be.prototype,"remoteFeatures",void 0);be=Ke([T("w3m-legal-footer")],be);const bt=He``;var vt=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let Se=class extends x{render(){const{termsConditionsUrl:t,privacyPolicyUrl:o}=y.state;return!t&&!o?null:l`
      <wui-flex
        .padding=${["4","3","3","3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `}howDoesItWorkTemplate(){return l` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){M.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:ue(f.state.activeChain)===pe.ACCOUNT_TYPES.SMART_ACCOUNT}}),p.push("WhatIsABuy")}};Se.styles=[bt];Se=vt([T("w3m-onramp-providers-footer")],Se);const yt=A`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;var Pe=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let re=class extends x{constructor(){super(...arguments),this.resizeObserver=void 0,this.unsubscribe=[],this.status="hide",this.view=p.state.view}firstUpdated(){this.status=oe.hasFooter()?"show":"hide",this.unsubscribe.push(p.subscribeKey("view",t=>{this.view=t,this.status=oe.hasFooter()?"show":"hide",this.status==="hide"&&document.documentElement.style.setProperty("--apkt-footer-height","0px")})),this.resizeObserver=new ResizeObserver(t=>{for(const o of t)if(o.target===this.getWrapper()){const i=`${o.contentRect.height}px`;document.documentElement.style.setProperty("--apkt-footer-height",i)}}),this.resizeObserver.observe(this.getWrapper())}render(){return l`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `}templatePageContainer(){return oe.hasFooter()?l` ${this.templateFooter()}`:null}templateFooter(){switch(this.view){case"Networks":return this.templateNetworksFooter();case"Connect":case"ConnectWallets":case"OnRampFiatSelect":case"OnRampTokenSelect":return l`<w3m-legal-footer></w3m-legal-footer>`;case"OnRampProviders":return l`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;default:return null}}templateNetworksFooter(){return l` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`}onNetworkHelp(){M.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),p.push("WhatIsANetwork")}getWrapper(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("div.container")}};re.styles=[yt];Pe([h()],re.prototype,"status",void 0);Pe([h()],re.prototype,"view",void 0);re=Pe([T("w3m-footer")],re);const kt=A`
  :host {
    display: block;
    width: inherit;
  }
`;var Ie=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let ae=class extends x{constructor(){super(),this.unsubscribe=[],this.viewState=p.state.view,this.history=p.state.history.join(","),this.unsubscribe.push(p.subscribeKey("view",()=>{this.history=p.state.history.join(","),document.documentElement.style.setProperty("--apkt-duration-dynamic","var(--apkt-durations-lg)")}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),document.documentElement.style.setProperty("--apkt-duration-dynamic","0s")}render(){return l`${this.templatePageContainer()}`}templatePageContainer(){return l`<w3m-router-container
      history=${this.history}
      .setView=${()=>{this.viewState=p.state.view}}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`}viewTemplate(t){switch(t){case"AccountSettings":return l`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return l`<w3m-account-view></w3m-account-view>`;case"AllWallets":return l`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return l`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return l`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return l`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":return l`<w3m-connect-view></w3m-connect-view>`;case"Create":return l`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return l`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return l`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return l`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return l`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return l`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return l`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return l`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"DataCapture":return l`<w3m-data-capture-view></w3m-data-capture-view>`;case"DataCaptureOtpConfirm":return l`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;case"Downloads":return l`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return l`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return l`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return l`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return l`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return l`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return l`<w3m-network-switch-view></w3m-network-switch-view>`;case"ProfileWallets":return l`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;case"Transactions":return l`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return l`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampTokenSelect":return l`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return l`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return l`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return l`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return l`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return l`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return l`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return l`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return l`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return l`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return l`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return l`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return l`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WalletSendConfirmed":return l`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;case"WhatIsABuy":return l`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return l`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return l`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return l`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return l`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return l`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return l`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return l`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return l`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return l`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return l`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return l`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return l`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return l`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return l`<w3m-pay-loading-view></w3m-pay-loading-view>`;case"FundWallet":return l`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;case"PayWithExchange":return l`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;case"PayWithExchangeSelectAsset":return l`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;case"UsageExceeded":return l`<w3m-usage-exceeded-view></w3m-usage-exceeded-view>`;default:return l`<w3m-connect-view></w3m-connect-view>`}}};ae.styles=[kt];Ie([h()],ae.prototype,"viewState",void 0);Ie([h()],ae.prototype,"history",void 0);ae=Ie([T("w3m-router")],ae);const Tt=A`
  :host {
    z-index: ${({tokens:e})=>e.core.zIndex};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${({tokens:e})=>e.theme.overlay};
    backdrop-filter: blur(0px);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      backdrop-filter ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    transition-delay: ${({durations:e})=>e.md};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.theme.borderPrimaryDark};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-border var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-default var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      w3m-shake ${({durations:e})=>e.xl}
        ${({easings:e})=>e["ease-out-power-2"]};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${({easings:e})=>e["ease-out-power-2"]};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
  }
`;var B=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};const Re="scroll-lock",xt={PayWithExchange:"0",PayWithExchangeSelectAsset:"0"};class N extends x{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=y.state.enableEmbedded,this.open=R.state.open,this.caipAddress=f.state.activeCaipAddress,this.caipNetwork=f.state.activeCaipNetwork,this.shake=R.state.shake,this.filterByNamespace=me.state.filterByNamespace,this.padding=he.spacing[1],this.mobileFullScreen=y.state.enableMobileFullScreen,this.initializeTheming(),le.prefetchAnalyticsConfig(),this.unsubscribe.push(R.subscribeKey("open",t=>t?this.onOpen():this.onClose()),R.subscribeKey("shake",t=>this.shake=t),f.subscribeKey("activeCaipNetwork",t=>this.onNewNetwork(t)),f.subscribeKey("activeCaipAddress",t=>this.onNewAddress(t)),y.subscribeKey("enableEmbedded",t=>this.enableEmbedded=t),me.subscribeKey("filterByNamespace",t=>{var o;this.filterByNamespace!==t&&!((o=f.getAccountData(t))!=null&&o.caipAddress)&&(le.fetchRecommendedWallets(),this.filterByNamespace=t)}),p.subscribeKey("view",()=>{this.dataset.border=oe.hasFooter()?"true":"false",this.padding=xt[p.state.view]??he.spacing[1]}))}firstUpdated(){if(this.dataset.border=oe.hasFooter()?"true":"false",this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.caipAddress){if(this.enableEmbedded){R.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.onRemoveKeyboardListener()}render(){return this.style.setProperty("--local-modal-padding",this.padding),this.enableEmbedded?l`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?l`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return l` <wui-card
      shake="${this.shake}"
      data-embedded="${O(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(t){if(t.target===t.currentTarget){if(this.mobileFullScreen)return;await this.handleClose()}}async handleClose(){await Me.safeClose()}initializeTheming(){const{themeVariables:t,themeMode:o}=Qe.state,i=je.getColorTheme(o);Ze(t,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),v.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const t=document.createElement("style");t.dataset.w3m=Re,t.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(t)}onScrollUnlock(){const t=document.head.querySelector(`style[data-w3m="${Re}"]`);t&&t.remove()}onAddKeyboardListener(){var o;this.abortController=new AbortController;const t=(o=this.shadowRoot)==null?void 0:o.querySelector("wui-card");t==null||t.focus(),window.addEventListener("keydown",i=>{if(i.key==="Escape")this.handleClose();else if(i.key==="Tab"){const{tagName:a}=i.target;a&&!a.includes("W3M-")&&!a.includes("WUI-")&&(t==null||t.focus())}},this.abortController)}onRemoveKeyboardListener(){var t;(t=this.abortController)==null||t.abort(),this.abortController=void 0}async onNewAddress(t){const o=f.state.isSwitchingNamespace,i=p.state.view==="ProfileWallets";!t&&!o&&!i&&R.close(),await Fe.initializeIfEnabled(t),this.caipAddress=t,f.setIsSwitchingNamespace(!1)}onNewNetwork(t){var w,g;const o=this.caipNetwork,i=(w=o==null?void 0:o.caipNetworkId)==null?void 0:w.toString(),a=(g=t==null?void 0:t.caipNetworkId)==null?void 0:g.toString(),n=i!==a,s=p.state.view==="UnsupportedChain",c=R.state.open;let d=!1;this.enableEmbedded&&p.state.view==="SwitchNetwork"&&(d=!0),n&&u.resetState(),c&&s&&(d=!0),d&&p.state.view!=="SIWXSignMessage"&&p.goBack(),this.caipNetwork=t}prefetch(){this.hasPrefetched||(le.prefetch(),le.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}N.styles=Tt;B([m({type:Boolean})],N.prototype,"enableEmbedded",void 0);B([h()],N.prototype,"open",void 0);B([h()],N.prototype,"caipAddress",void 0);B([h()],N.prototype,"caipNetwork",void 0);B([h()],N.prototype,"shake",void 0);B([h()],N.prototype,"filterByNamespace",void 0);B([h()],N.prototype,"padding",void 0);B([h()],N.prototype,"mobileFullScreen",void 0);let Oe=class extends N{};Oe=B([T("w3m-modal")],Oe);let De=class extends N{};De=B([T("appkit-modal")],De);const St=A`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: ${({borderRadius:e})=>e[5]};
    background-color: ${({colors:e})=>e.semanticError010};
  }
`;var Ct=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let Ce=class extends x{constructor(){super()}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1","3","4","3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="error" name="warningCircle"></wui-icon>
        </wui-flex>

        <wui-text variant="lg-medium" color="primary" align="center">
          The app isn't responding as expected
        </wui-text>
        <wui-text variant="md-regular" color="secondary" align="center">
          Try again or reach out to the app team for help.
        </wui-text>

        <wui-button
          variant="neutral-secondary"
          size="md"
          @click=${this.onTryAgainClick.bind(this)}
          data-testid="w3m-usage-exceeded-button"
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try Again
        </wui-button>
      </wui-flex>
    `}onTryAgainClick(){p.goBack()}};Ce.styles=St;Ce=Ct([T("w3m-usage-exceeded-view")],Ce);const At=A`
  :host {
    width: 100%;
  }
`;var C=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let k=class extends x{constructor(){super(...arguments),this.hasImpressionSent=!1,this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100",this.rdnsId="",this.displayIndex=void 0,this.walletRank=void 0}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupIntersectionObserver()}updated(t){super.updated(t),(t.has("name")||t.has("imageSrc")||t.has("walletRank"))&&(this.hasImpressionSent=!1),t.has("walletRank")&&this.walletRank&&!this.intersectionObserver&&this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&!this.loading&&!this.hasImpressionSent&&this.sendImpressionEvent()})},{threshold:.1}),this.intersectionObserver.observe(this)}cleanupIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0)}sendImpressionEvent(){!this.name||this.hasImpressionSent||!this.walletRank||(this.hasImpressionSent=!0,(this.rdnsId||this.name)&&M.sendWalletImpressionEvent({name:this.name,walletRank:this.walletRank,rdnsId:this.rdnsId,view:p.state.view,displayIndex:this.displayIndex}))}render(){return l`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${O(this.imageSrc)}
        name=${this.name}
        size=${O(this.size)}
        tagLabel=${O(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
      ></wui-list-wallet>
    `}};k.styles=At;C([m({type:Array})],k.prototype,"walletImages",void 0);C([m()],k.prototype,"imageSrc",void 0);C([m()],k.prototype,"name",void 0);C([m()],k.prototype,"size",void 0);C([m()],k.prototype,"tagLabel",void 0);C([m()],k.prototype,"tagVariant",void 0);C([m()],k.prototype,"walletIcon",void 0);C([m()],k.prototype,"tabIdx",void 0);C([m({type:Boolean})],k.prototype,"disabled",void 0);C([m({type:Boolean})],k.prototype,"showAllWallets",void 0);C([m({type:Boolean})],k.prototype,"loading",void 0);C([m({type:String})],k.prototype,"loadingSpinnerColor",void 0);C([m()],k.prototype,"rdnsId",void 0);C([m()],k.prototype,"displayIndex",void 0);C([m()],k.prototype,"walletRank",void 0);k=C([T("w3m-list-wallet")],k);const $t=A`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${({durations:e})=>e.lg};
    --local-transition: ${({easings:e})=>e["ease-out-power-2"]};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;var U=function(e,t,o,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(n=(a<3?s(n):a>3?s(t,o,n):s(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};const Pt=60;let I=class extends x{constructor(){super(...arguments),this.resizeObserver=void 0,this.transitionDuration="0.15s",this.transitionFunction="",this.history="",this.view="",this.setView=void 0,this.viewDirection="",this.historyState="",this.previousHeight="0px",this.mobileFullScreen=y.state.enableMobileFullScreen,this.onViewportResize=()=>{this.updateContainerHeight()}}updated(t){if(t.has("history")){const o=this.history;this.historyState!==""&&this.historyState!==o&&this.onViewChange(o)}t.has("transitionDuration")&&this.style.setProperty("--local-duration",this.transitionDuration),t.has("transitionFunction")&&this.style.setProperty("--local-transition",this.transitionFunction)}firstUpdated(){var t;this.transitionFunction&&this.style.setProperty("--local-transition",this.transitionFunction),this.style.setProperty("--local-duration",this.transitionDuration),this.historyState=this.history,this.resizeObserver=new ResizeObserver(o=>{var i;for(const a of o)if(a.target===this.getWrapper()){let n=a.contentRect.height;const s=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");if(this.mobileFullScreen){const c=((i=window.visualViewport)==null?void 0:i.height)||window.innerHeight,d=this.getHeaderHeight();n=c-d-s,this.style.setProperty("--local-border-bottom-radius","0px")}else n=n+s,this.style.setProperty("--local-border-bottom-radius",s?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${n}px`),this.previousHeight!=="0px"&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${n}px`}}),this.resizeObserver.observe(this.getWrapper()),this.updateContainerHeight(),window.addEventListener("resize",this.onViewportResize),(t=window.visualViewport)==null||t.addEventListener("resize",this.onViewportResize)}disconnectedCallback(){var o;const t=this.getWrapper();t&&this.resizeObserver&&this.resizeObserver.unobserve(t),window.removeEventListener("resize",this.onViewportResize),(o=window.visualViewport)==null||o.removeEventListener("resize",this.onViewportResize)}render(){return l`
      <div class="container" data-mobile-fullscreen="${O(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${O(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}onViewChange(t){const o=t.split(",").filter(Boolean),i=this.historyState.split(",").filter(Boolean),a=i.length,n=o.length,s=o[o.length-1]||"",c=je.cssDurationToNumber(this.transitionDuration);let d="";n>a?d="next":n<a?d="prev":n===a&&o[n-1]!==i[a-1]&&(d="next"),this.viewDirection=`${d}-${s}`,setTimeout(()=>{var w;this.historyState=t,(w=this.setView)==null||w.call(this,s)},c),setTimeout(()=>{this.viewDirection=""},c*2)}getWrapper(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("div.page")}updateContainerHeight(){var a;const t=this.getWrapper();if(!t)return;const o=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");let i=0;if(this.mobileFullScreen){const n=((a=window.visualViewport)==null?void 0:a.height)||window.innerHeight,s=this.getHeaderHeight();i=n-s-o,this.style.setProperty("--local-border-bottom-radius","0px")}else i=t.getBoundingClientRect().height+o,this.style.setProperty("--local-border-bottom-radius",o?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${i}px`),this.previousHeight!=="0px"&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${i}px`}getHeaderHeight(){return Pt}};I.styles=[$t];U([m({type:String})],I.prototype,"transitionDuration",void 0);U([m({type:String})],I.prototype,"transitionFunction",void 0);U([m({type:String})],I.prototype,"history",void 0);U([m({type:String})],I.prototype,"view",void 0);U([m({attribute:!1})],I.prototype,"setView",void 0);U([h()],I.prototype,"viewDirection",void 0);U([h()],I.prototype,"historyState",void 0);U([h()],I.prototype,"previousHeight",void 0);U([h()],I.prototype,"mobileFullScreen",void 0);I=U([T("w3m-router-container")],I);export{De as AppKitModal,k as W3mListWallet,Oe as W3mModal,N as W3mModalBase,I as W3mRouterContainer,Ce as W3mUsageExceededView};
