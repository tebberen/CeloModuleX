import{i as k,C as j,A as T,O as N,a as S,b as _,c as qe,x as d,E as O,R as E,d as P,e as Lt,f as ge,g as de,H as $n,r as V,h as ue,T as bt,S as Le,M as Ht,j as Kt,k as Gt,l as Qt,m as We,n as le,o as xn,p as En,q as Nt,s as Jt,W as yt}from"./core-DKVhzpCZ.js";import{n as u,r as $,c as I,o as A,U as oe,i as Rn,t as _n,e as Sn}from"./index-Cp_RxaPf.js";import"./index-CvszuOpk.js";var Ie=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let me=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.count=T.state.count,this.filteredCount=T.state.filteredWallets.length,this.isFetchingRecommendedWallets=T.state.isFetchingRecommendedWallets,this.unsubscribe.push(j.subscribeKey("connectors",e=>this.connectors=e),T.subscribeKey("count",e=>this.count=e),T.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),T.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(c=>c.id==="walletConnect"),{allWallets:n}=N.state;if(!e||n==="HIDE"||n==="ONLY_MOBILE"&&!S.isMobile())return null;const o=T.state.featured.length,r=this.count+o,i=r<10?r:Math.floor(r/10)*10,s=this.filteredCount>0?this.filteredCount:i;let a=`${s}`;this.filteredCount>0?a=`${this.filteredCount}`:s<r&&(a=`${s}+`);const l=_.hasAnyConnection(qe.CONNECTOR_ID.WALLET_CONNECT);return d`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${a}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${A(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${l}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){var e;O.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),E.push("AllWallets",{redirectView:(e=E.state.data)==null?void 0:e.redirectView})}};Ie([u()],me.prototype,"tabIdx",void 0);Ie([$()],me.prototype,"connectors",void 0);Ie([$()],me.prototype,"count",void 0);Ie([$()],me.prototype,"filteredCount",void 0);Ie([$()],me.prototype,"isFetchingRecommendedWallets",void 0);me=Ie([I("w3m-all-wallets-widget")],me);const Tn=P`
  :host {
    margin-top: ${({spacing:t})=>t[1]};
  }
  wui-separator {
    margin: ${({spacing:t})=>t[3]} calc(${({spacing:t})=>t[3]} * -1)
      ${({spacing:t})=>t[2]} calc(${({spacing:t})=>t[3]} * -1);
    width: calc(100% + ${({spacing:t})=>t[3]} * 2);
  }
`;var se=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let G=class extends k{constructor(){super(),this.unsubscribe=[],this.connectors=j.state.connectors,this.recommended=T.state.recommended,this.featured=T.state.featured,this.explorerWallets=T.state.explorerWallets,this.connections=_.state.connections,this.connectorImages=Lt.state.connectorImages,this.loadingTelegram=!1,this.unsubscribe.push(j.subscribeKey("connectors",e=>this.connectors=e),_.subscribeKey("connections",e=>this.connections=e),Lt.subscribeKey("connectorImages",e=>this.connectorImages=e),T.subscribeKey("recommended",e=>this.recommended=e),T.subscribeKey("featured",e=>this.featured=e),T.subscribeKey("explorerFilteredWallets",e=>{this.explorerWallets=e!=null&&e.length?e:T.state.explorerWallets}),T.subscribeKey("explorerWallets",e=>{var n;(n=this.explorerWallets)!=null&&n.length||(this.explorerWallets=e)})),S.isTelegram()&&S.isIos()&&(this.loadingTelegram=!_.state.wcUri,this.unsubscribe.push(_.subscribeKey("wcUri",e=>this.loadingTelegram=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return d`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}mapConnectorsToExplorerWallets(e,n){return e.map(o=>{if(o.type==="MULTI_CHAIN"&&o.connectors){const i=o.connectors.map(c=>c.id),s=o.connectors.map(c=>c.name),a=o.connectors.map(c=>{var h;return(h=c.info)==null?void 0:h.rdns}),l=n==null?void 0:n.find(c=>i.includes(c.id)||s.includes(c.name)||c.rdns&&(a.includes(c.rdns)||i.includes(c.rdns)));return o.explorerWallet=l??o.explorerWallet,o}const r=n==null?void 0:n.find(i=>{var s;return i.id===o.id||i.rdns===((s=o.info)==null?void 0:s.rdns)||i.name===o.name});return o.explorerWallet=r??o.explorerWallet,o})}processConnectorsByType(e,n=!0){const o=ge.sortConnectorsByExplorerWallet([...e]);return n?o.filter(ge.showConnector):o}connectorListTemplate(){const e=this.mapConnectorsToExplorerWallets(this.connectors,this.explorerWallets??[]),n=ge.getConnectorsByType(e,this.recommended,this.featured),o=this.processConnectorsByType(n.announced.filter(f=>f.id!=="walletConnect")),r=this.processConnectorsByType(n.injected),i=this.processConnectorsByType(n.multiChain.filter(f=>f.name!=="WalletConnect"),!1),s=n.custom,a=n.recent,l=this.processConnectorsByType(n.external.filter(f=>f.id!==qe.CONNECTOR_ID.COINBASE_SDK)),c=n.recommended,h=n.featured,R=ge.getConnectorTypeOrder({custom:s,recent:a,announced:o,injected:r,multiChain:i,recommended:c,featured:h,external:l}),C=this.connectors.find(f=>f.id==="walletConnect"),y=S.isMobile(),v=[];for(const f of R)switch(f){case"walletConnect":{!y&&C&&v.push({kind:"connector",subtype:"walletConnect",connector:C});break}case"recent":{ge.getFilteredRecentWallets().forEach(p=>v.push({kind:"wallet",subtype:"recent",wallet:p}));break}case"injected":{i.forEach(w=>v.push({kind:"connector",subtype:"multiChain",connector:w})),o.forEach(w=>v.push({kind:"connector",subtype:"announced",connector:w})),r.forEach(w=>v.push({kind:"connector",subtype:"injected",connector:w}));break}case"featured":{h.forEach(w=>v.push({kind:"wallet",subtype:"featured",wallet:w}));break}case"custom":{ge.getFilteredCustomWallets(s??[]).forEach(p=>v.push({kind:"wallet",subtype:"custom",wallet:p}));break}case"external":{l.forEach(w=>v.push({kind:"connector",subtype:"external",connector:w}));break}case"recommended":{ge.getCappedRecommendedWallets(c).forEach(p=>v.push({kind:"wallet",subtype:"recommended",wallet:p}));break}default:console.warn(`Unknown connector type: ${f}`)}return v.map((f,w)=>f.kind==="connector"?this.renderConnector(f,w):this.renderWallet(f,w))}renderConnector(e,n){var R,C;const o=e.connector,r=de.getConnectorImage(o)||this.connectorImages[(o==null?void 0:o.imageId)??""],s=(this.connections.get(o.chain)??[]).some(y=>$n.isLowerCaseMatch(y.connectorId,o.id));let a,l;e.subtype==="multiChain"?(a="multichain",l="info"):e.subtype==="walletConnect"?(a="qr code",l="accent"):e.subtype==="injected"||e.subtype==="announced"?(a=s?"connected":"installed",l=s?"info":"success"):(a=void 0,l=void 0);const c=_.hasAnyConnection(qe.CONNECTOR_ID.WALLET_CONNECT),h=e.subtype==="walletConnect"||e.subtype==="external"?c:!1;return d`
      <w3m-list-wallet
        displayIndex=${n}
        imageSrc=${A(r)}
        .installed=${!0}
        name=${o.name??"Unknown"}
        .tagVariant=${l}
        tagLabel=${A(a)}
        data-testid=${`wallet-selector-${o.id.toLowerCase()}`}
        size="sm"
        @click=${()=>this.onClickConnector(e)}
        tabIdx=${A(this.tabIdx)}
        ?disabled=${h}
        rdnsId=${A(((R=o.explorerWallet)==null?void 0:R.rdns)||void 0)}
        walletRank=${A((C=o.explorerWallet)==null?void 0:C.order)}
      >
      </w3m-list-wallet>
    `}onClickConnector(e){var o;const n=(o=E.state.data)==null?void 0:o.redirectView;if(e.subtype==="walletConnect"){j.setActiveConnector(e.connector),S.isMobile()?E.push("AllWallets"):E.push("ConnectingWalletConnect",{redirectView:n});return}if(e.subtype==="multiChain"){j.setActiveConnector(e.connector),E.push("ConnectingMultiChain",{redirectView:n});return}if(e.subtype==="injected"){j.setActiveConnector(e.connector),E.push("ConnectingExternal",{connector:e.connector,redirectView:n,wallet:e.connector.explorerWallet});return}if(e.subtype==="announced"){if(e.connector.id==="walletConnect"){S.isMobile()?E.push("AllWallets"):E.push("ConnectingWalletConnect",{redirectView:n});return}E.push("ConnectingExternal",{connector:e.connector,redirectView:n,wallet:e.connector.explorerWallet});return}E.push("ConnectingExternal",{connector:e.connector,redirectView:n})}renderWallet(e,n){const o=e.wallet,r=de.getWalletImage(o),s=_.hasAnyConnection(qe.CONNECTOR_ID.WALLET_CONNECT),a=this.loadingTelegram,l=e.subtype==="recent"?"recent":void 0,c=e.subtype==="recent"?"info":void 0;return d`
      <w3m-list-wallet
        displayIndex=${n}
        imageSrc=${A(r)}
        name=${o.name??"Unknown"}
        @click=${()=>this.onClickWallet(e)}
        size="sm"
        data-testid=${`wallet-selector-${o.id}`}
        tabIdx=${A(this.tabIdx)}
        ?loading=${a}
        ?disabled=${s}
        rdnsId=${A(o.rdns||void 0)}
        walletRank=${A(o.order)}
        tagLabel=${A(l)}
        .tagVariant=${c}
      >
      </w3m-list-wallet>
    `}onClickWallet(e){var r;const n=(r=E.state.data)==null?void 0:r.redirectView;if(e.subtype==="featured"){j.selectWalletConnector(e.wallet);return}if(e.subtype==="recent"){if(this.loadingTelegram)return;j.selectWalletConnector(e.wallet);return}if(e.subtype==="custom"){if(this.loadingTelegram)return;E.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:n});return}if(this.loadingTelegram)return;const o=j.getConnector({id:e.wallet.id,rdns:e.wallet.rdns});o?E.push("ConnectingExternal",{connector:o,redirectView:n}):E.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:n})}};G.styles=Tn;se([u({type:Number})],G.prototype,"tabIdx",void 0);se([$()],G.prototype,"connectors",void 0);se([$()],G.prototype,"recommended",void 0);se([$()],G.prototype,"featured",void 0);se([$()],G.prototype,"explorerWallets",void 0);se([$()],G.prototype,"connections",void 0);se([$()],G.prototype,"connectorImages",void 0);se([$()],G.prototype,"loadingTelegram",void 0);G=se([I("w3m-connector-list")],G);const In=P`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:t})=>t[1]} ${({spacing:t})=>t[2]};
    column-gap: ${({spacing:t})=>t[1]};
    color: ${({tokens:t})=>t.theme.textSecondary};
    border-radius: ${({borderRadius:t})=>t[20]};
    background-color: transparent;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:t})=>t.theme.textPrimary};
    background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:t})=>t.theme.textPrimary};
    }
  }
`;var Oe=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};const kn={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},An={lg:"md",md:"sm",sm:"sm"};let we=class extends k{constructor(){super(...arguments),this.icon="mobile",this.size="md",this.label="",this.active=!1}render(){return d`
      <button data-active=${this.active}>
        ${this.icon?d`<wui-icon size=${An[this.size]} name=${this.icon}></wui-icon>`:""}
        <wui-text variant=${kn[this.size]}> ${this.label} </wui-text>
      </button>
    `}};we.styles=[V,ue,In];Oe([u()],we.prototype,"icon",void 0);Oe([u()],we.prototype,"size",void 0);Oe([u()],we.prototype,"label",void 0);Oe([u({type:Boolean})],we.prototype,"active",void 0);we=Oe([I("wui-tab-item")],we);const Wn=P`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    border-radius: ${({borderRadius:t})=>t[32]};
    padding: ${({spacing:t})=>t["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;var Me=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let be=class extends k{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size="md",this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((e,n)=>{var r;const o=n===this.activeTab;return d`
        <wui-tab-item
          @click=${()=>this.onTabClick(n)}
          icon=${e.icon}
          size=${this.size}
          label=${e.label}
          ?active=${o}
          data-active=${o}
          data-testid="tab-${(r=e.label)==null?void 0:r.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(e){this.activeTab=e,this.onTabChange(e)}};be.styles=[V,ue,Wn];Me([u({type:Array})],be.prototype,"tabs",void 0);Me([u()],be.prototype,"onTabChange",void 0);Me([u()],be.prototype,"size",void 0);Me([$()],be.prototype,"activeTab",void 0);be=Me([I("wui-tabs")],be);var Rt=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let He=class extends k{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return d`
      <wui-flex justifyContent="center" .padding=${["0","0","4","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(n=>n==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:n==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:n==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:n==="web"?{label:"Webapp",icon:"browser",platform:"web"}:n==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:n})=>n),e}onTabChange(e){var o;const n=this.platformTabs[e];n&&((o=this.onSelectPlatfrom)==null||o.call(this,n))}};Rt([u({type:Array})],He.prototype,"platforms",void 0);Rt([u()],He.prototype,"onSelectPlatfrom",void 0);He=Rt([I("w3m-connecting-header")],He);const Pn=P`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${t=>t.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var Yt=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Ke=class extends k{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,o=36-e,r=116+o,i=245+o,s=360+o*1.75;return d`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${r} ${i}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};Ke.styles=[V,Pn];Yt([u({type:Number})],Ke.prototype,"radius",void 0);Ke=Yt([I("wui-loading-thumbnail")],Ke);const Bn=P`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[5]};
    padding-left: ${({spacing:t})=>t[3]};
    padding-right: ${({spacing:t})=>t[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:t})=>t[6]};
  }

  wui-text {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;var ot=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let xe=class extends k{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return d`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};xe.styles=[V,ue,Bn];ot([u({type:Boolean})],xe.prototype,"disabled",void 0);ot([u()],xe.prototype,"label",void 0);ot([u()],xe.prototype,"buttonLabel",void 0);xe=ot([I("wui-cta-button")],xe);const Ln=P`
  :host {
    display: block;
    padding: 0 ${({spacing:t})=>t[5]} ${({spacing:t})=>t[5]};
  }
`;var Xt=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Ge=class extends k{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:n,play_store:o,chrome_store:r,homepage:i}=this.wallet,s=S.isMobile(),a=S.isIos(),l=S.isAndroid(),c=[n,o,i,r].filter(Boolean).length>1,h=oe.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return c&&!s?d`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${()=>E.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!c&&i?d`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:n&&a?d`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:o&&l?d`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&S.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&S.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&S.openHref(this.wallet.homepage,"_blank")}};Ge.styles=[Ln];Xt([u({type:Object})],Ge.prototype,"wallet",void 0);Ge=Xt([I("w3m-mobile-download-links")],Ge);const Nn=P`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:t})=>t[1]} * -1);
    bottom: calc(${({spacing:t})=>t[1]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:t})=>t.lg};
    transition-timing-function: ${({easings:t})=>t["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:t})=>t[4]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:t})=>t["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;var Q=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};class L extends k{constructor(){var e,n,o,r,i;super(),this.wallet=(e=E.state.data)==null?void 0:e.wallet,this.connector=(n=E.state.data)==null?void 0:n.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=de.getConnectorImage(this.connector)??de.getWalletImage(this.wallet),this.name=((o=this.wallet)==null?void 0:o.name)??((r=this.connector)==null?void 0:r.name)??"Wallet",this.isRetrying=!1,this.uri=_.state.wcUri,this.error=_.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(_.subscribeKey("wcUri",s=>{var a;this.uri=s,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,(a=this.onConnect)==null||a.call(this))}),_.subscribeKey("wcError",s=>this.error=s)),(S.isTelegram()||S.isSafari())&&S.isIos()&&_.state.wcUri&&((i=this.onConnect)==null||i.call(this))}firstUpdated(){var e;(e=this.onAutoConnect)==null||e.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),_.setWcError(!1),clearTimeout(this.timeout)}render(){var o;(o=this.onRender)==null||o.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let n="";return this.label?n=this.label:(n=`Continue in ${this.name}`,this.error&&(n="Connection declined")),d`
      <wui-flex
        data-error=${A(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${A(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","0","0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?"error":"primary"}>
            ${n}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?d`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?d`
              <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const n=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");n==null||n.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){var e,n;_.setWcError(!1),this.onRetry?(this.isRetrying=!0,(e=this.onRetry)==null||e.call(this)):(n=this.onConnect)==null||n.call(this)}loaderTemplate(){const e=bt.state.themeVariables["--w3m-border-radius-master"],n=e?parseInt(e.replace("px",""),10):4;return d`<wui-loading-thumbnail radius=${n*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(S.copyToClopboard(this.uri),Le.showSuccess("Link copied"))}catch{Le.showError("Failed to copy")}}}L.styles=Nn;Q([$()],L.prototype,"isRetrying",void 0);Q([$()],L.prototype,"uri",void 0);Q([$()],L.prototype,"error",void 0);Q([$()],L.prototype,"ready",void 0);Q([$()],L.prototype,"showRetry",void 0);Q([$()],L.prototype,"label",void 0);Q([$()],L.prototype,"secondaryBtnLabel",void 0);Q([$()],L.prototype,"secondaryLabel",void 0);Q([$()],L.prototype,"isLoading",void 0);Q([u({type:Boolean})],L.prototype,"isMobile",void 0);Q([u()],L.prototype,"onRetry",void 0);var On=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Ot=class extends L{constructor(){var e;if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),O.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:(e=this.wallet)==null?void 0:e.display_index,walletRank:this.wallet.order,view:E.state.view}})}async onConnectProxy(){var e,n;try{this.error=!1;const{connectors:o}=j.state,r=o.find(i=>{var s,a,l;return i.type==="ANNOUNCED"&&((s=i.info)==null?void 0:s.rdns)===((a=this.wallet)==null?void 0:a.rdns)||i.type==="INJECTED"||i.name===((l=this.wallet)==null?void 0:l.name)});if(r)await _.connectExternal(r,r.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");Ht.close(),O.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:((e=this.wallet)==null?void 0:e.name)||"Unknown",view:E.state.view,walletRank:(n=this.wallet)==null?void 0:n.order}})}catch(o){o instanceof Kt&&o.originalName===Gt.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?O.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:o.message}}):O.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(o==null?void 0:o.message)??"Unknown"}}),this.error=!0}}};Ot=On([I("w3m-connecting-wc-browser")],Ot);var Mn=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Mt=class extends L{constructor(){var e;if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),O.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:(e=this.wallet)==null?void 0:e.display_index,walletRank:this.wallet.order,view:E.state.view}})}onRenderProxy(){var e;!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:n,name:o}=this.wallet,{redirect:r,href:i}=S.formatNativeUrl(n,this.uri);_.setWcLinking({name:o,href:i}),_.setRecentWallet(this.wallet),S.openHref(r,"_blank")}catch{this.error=!0}}};Mt=Mn([I("w3m-connecting-wc-desktop")],Mt);var ke=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let ye=class extends L{constructor(){var e;if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=N.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{var n;if((n=this.wallet)!=null&&n.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:o,link_mode:r,name:i}=this.wallet,{redirect:s,redirectUniversalLink:a,href:l}=S.formatNativeUrl(o,this.uri,r);this.redirectDeeplink=s,this.redirectUniversalLink=a,this.target=S.isIframe()?"_top":"_self",_.setWcLinking({name:i,href:l}),_.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?S.openHref(this.redirectUniversalLink,this.target):S.openHref(this.redirectDeeplink,this.target)}catch(o){O.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:o instanceof Error?o.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=Qt.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(_.subscribeKey("wcUri",()=>{this.onHandleURI()})),O.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:(e=this.wallet)==null?void 0:e.display_index,walletRank:this.wallet.order,view:E.state.view}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){var e;this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onTryAgain(){var e;_.setWcError(!1),(e=this.onConnect)==null||e.call(this)}};ke([$()],ye.prototype,"redirectDeeplink",void 0);ke([$()],ye.prototype,"redirectUniversalLink",void 0);ke([$()],ye.prototype,"target",void 0);ke([$()],ye.prototype,"preferUniversalLinks",void 0);ke([$()],ye.prototype,"isLoading",void 0);ye=ke([I("w3m-connecting-wc-mobile")],ye);var De={},Dn=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Zt={},U={};let _t;const jn=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];U.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};U.getSymbolTotalCodewords=function(e){return jn[e]};U.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};U.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');_t=e};U.isKanjiModeEnabled=function(){return typeof _t<"u"};U.toSJIS=function(e){return _t(e)};var rt={};(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+n)}}t.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},t.from=function(o,r){if(t.isValid(o))return o;try{return e(o)}catch{return r}}})(rt);function en(){this.buffer=[],this.length=0}en.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var Un=en;function je(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}je.prototype.set=function(t,e,n,o){const r=t*this.size+e;this.data[r]=n,o&&(this.reservedBit[r]=!0)};je.prototype.get=function(t,e){return this.data[t*this.size+e]};je.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n};je.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var zn=je,tn={};(function(t){const e=U.getSymbolSize;t.getRowColCoords=function(o){if(o===1)return[];const r=Math.floor(o/7)+2,i=e(o),s=i===145?26:Math.ceil((i-13)/(2*r-2))*2,a=[i-7];for(let l=1;l<r-1;l++)a[l]=a[l-1]-s;return a.push(6),a.reverse()},t.getPositions=function(o){const r=[],i=t.getRowColCoords(o),s=i.length;for(let a=0;a<s;a++)for(let l=0;l<s;l++)a===0&&l===0||a===0&&l===s-1||a===s-1&&l===0||r.push([i[a],i[l]]);return r}})(tn);var nn={};const Fn=U.getSymbolSize,Dt=7;nn.getPositions=function(e){const n=Fn(e);return[[0,0],[n-Dt,0],[0,n-Dt]]};var on={};(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},t.from=function(r){return t.isValid(r)?parseInt(r,10):void 0},t.getPenaltyN1=function(r){const i=r.size;let s=0,a=0,l=0,c=null,h=null;for(let R=0;R<i;R++){a=l=0,c=h=null;for(let C=0;C<i;C++){let y=r.get(R,C);y===c?a++:(a>=5&&(s+=e.N1+(a-5)),c=y,a=1),y=r.get(C,R),y===h?l++:(l>=5&&(s+=e.N1+(l-5)),h=y,l=1)}a>=5&&(s+=e.N1+(a-5)),l>=5&&(s+=e.N1+(l-5))}return s},t.getPenaltyN2=function(r){const i=r.size;let s=0;for(let a=0;a<i-1;a++)for(let l=0;l<i-1;l++){const c=r.get(a,l)+r.get(a,l+1)+r.get(a+1,l)+r.get(a+1,l+1);(c===4||c===0)&&s++}return s*e.N2},t.getPenaltyN3=function(r){const i=r.size;let s=0,a=0,l=0;for(let c=0;c<i;c++){a=l=0;for(let h=0;h<i;h++)a=a<<1&2047|r.get(c,h),h>=10&&(a===1488||a===93)&&s++,l=l<<1&2047|r.get(h,c),h>=10&&(l===1488||l===93)&&s++}return s*e.N3},t.getPenaltyN4=function(r){let i=0;const s=r.data.length;for(let l=0;l<s;l++)i+=r.data[l];return Math.abs(Math.ceil(i*100/s/5)-10)*e.N4};function n(o,r,i){switch(o){case t.Patterns.PATTERN000:return(r+i)%2===0;case t.Patterns.PATTERN001:return r%2===0;case t.Patterns.PATTERN010:return i%3===0;case t.Patterns.PATTERN011:return(r+i)%3===0;case t.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(i/3))%2===0;case t.Patterns.PATTERN101:return r*i%2+r*i%3===0;case t.Patterns.PATTERN110:return(r*i%2+r*i%3)%2===0;case t.Patterns.PATTERN111:return(r*i%3+(r+i)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}t.applyMask=function(r,i){const s=i.size;for(let a=0;a<s;a++)for(let l=0;l<s;l++)i.isReserved(l,a)||i.xor(l,a,n(r,l,a))},t.getBestMask=function(r,i){const s=Object.keys(t.Patterns).length;let a=0,l=1/0;for(let c=0;c<s;c++){i(c),t.applyMask(c,r);const h=t.getPenaltyN1(r)+t.getPenaltyN2(r)+t.getPenaltyN3(r)+t.getPenaltyN4(r);t.applyMask(c,r),h<l&&(l=h,a=c)}return a}})(on);var st={};const ce=rt,Fe=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Ve=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];st.getBlocksCount=function(e,n){switch(n){case ce.L:return Fe[(e-1)*4+0];case ce.M:return Fe[(e-1)*4+1];case ce.Q:return Fe[(e-1)*4+2];case ce.H:return Fe[(e-1)*4+3];default:return}};st.getTotalCodewordsCount=function(e,n){switch(n){case ce.L:return Ve[(e-1)*4+0];case ce.M:return Ve[(e-1)*4+1];case ce.Q:return Ve[(e-1)*4+2];case ce.H:return Ve[(e-1)*4+3];default:return}};var rn={},at={};const Pe=new Uint8Array(512),Qe=new Uint8Array(256);(function(){let e=1;for(let n=0;n<255;n++)Pe[n]=e,Qe[e]=n,e<<=1,e&256&&(e^=285);for(let n=255;n<512;n++)Pe[n]=Pe[n-255]})();at.log=function(e){if(e<1)throw new Error("log("+e+")");return Qe[e]};at.exp=function(e){return Pe[e]};at.mul=function(e,n){return e===0||n===0?0:Pe[Qe[e]+Qe[n]]};(function(t){const e=at;t.mul=function(o,r){const i=new Uint8Array(o.length+r.length-1);for(let s=0;s<o.length;s++)for(let a=0;a<r.length;a++)i[s+a]^=e.mul(o[s],r[a]);return i},t.mod=function(o,r){let i=new Uint8Array(o);for(;i.length-r.length>=0;){const s=i[0];for(let l=0;l<r.length;l++)i[l]^=e.mul(r[l],s);let a=0;for(;a<i.length&&i[a]===0;)a++;i=i.slice(a)}return i},t.generateECPolynomial=function(o){let r=new Uint8Array([1]);for(let i=0;i<o;i++)r=t.mul(r,new Uint8Array([1,e.exp(i)]));return r}})(rn);const sn=rn;function St(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}St.prototype.initialize=function(e){this.degree=e,this.genPoly=sn.generateECPolynomial(this.degree)};St.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(e.length+this.degree);n.set(e);const o=sn.mod(n,this.genPoly),r=this.degree-o.length;if(r>0){const i=new Uint8Array(this.degree);return i.set(o,r),i}return o};var Vn=St,an={},he={},Tt={};Tt.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var Z={};const ln="[0-9]+",qn="[A-Z $%*+\\-./:]+";let Ne="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Ne=Ne.replace(/u/g,"\\u");const Hn="(?:(?![A-Z0-9 $%*+\\-./:]|"+Ne+`)(?:.|[\r
]))+`;Z.KANJI=new RegExp(Ne,"g");Z.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");Z.BYTE=new RegExp(Hn,"g");Z.NUMERIC=new RegExp(ln,"g");Z.ALPHANUMERIC=new RegExp(qn,"g");const Kn=new RegExp("^"+Ne+"$"),Gn=new RegExp("^"+ln+"$"),Qn=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Z.testKanji=function(e){return Kn.test(e)};Z.testNumeric=function(e){return Gn.test(e)};Z.testAlphanumeric=function(e){return Qn.test(e)};(function(t){const e=Tt,n=Z;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(i,s){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?i.ccBits[0]:s<27?i.ccBits[1]:i.ccBits[2]},t.getBestModeForData=function(i){return n.testNumeric(i)?t.NUMERIC:n.testAlphanumeric(i)?t.ALPHANUMERIC:n.testKanji(i)?t.KANJI:t.BYTE},t.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},t.isValid=function(i){return i&&i.bit&&i.ccBits};function o(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+r)}}t.from=function(i,s){if(t.isValid(i))return i;try{return o(i)}catch{return s}}})(he);(function(t){const e=U,n=st,o=rt,r=he,i=Tt,s=7973,a=e.getBCHDigit(s);function l(C,y,v){for(let f=1;f<=40;f++)if(y<=t.getCapacity(f,v,C))return f}function c(C,y){return r.getCharCountIndicator(C,y)+4}function h(C,y){let v=0;return C.forEach(function(f){const w=c(f.mode,y);v+=w+f.getBitsLength()}),v}function R(C,y){for(let v=1;v<=40;v++)if(h(C,v)<=t.getCapacity(v,y,r.MIXED))return v}t.from=function(y,v){return i.isValid(y)?parseInt(y,10):v},t.getCapacity=function(y,v,f){if(!i.isValid(y))throw new Error("Invalid QR Code version");typeof f>"u"&&(f=r.BYTE);const w=e.getSymbolTotalCodewords(y),p=n.getTotalCodewordsCount(y,v),m=(w-p)*8;if(f===r.MIXED)return m;const b=m-c(f,y);switch(f){case r.NUMERIC:return Math.floor(b/10*3);case r.ALPHANUMERIC:return Math.floor(b/11*2);case r.KANJI:return Math.floor(b/13);case r.BYTE:default:return Math.floor(b/8)}},t.getBestVersionForData=function(y,v){let f;const w=o.from(v,o.M);if(Array.isArray(y)){if(y.length>1)return R(y,w);if(y.length===0)return 1;f=y[0]}else f=y;return l(f.mode,f.getLength(),w)},t.getEncodedBits=function(y){if(!i.isValid(y)||y<7)throw new Error("Invalid QR Code version");let v=y<<12;for(;e.getBCHDigit(v)-a>=0;)v^=s<<e.getBCHDigit(v)-a;return y<<12|v}})(an);var cn={};const vt=U,dn=1335,Jn=21522,jt=vt.getBCHDigit(dn);cn.getEncodedBits=function(e,n){const o=e.bit<<3|n;let r=o<<10;for(;vt.getBCHDigit(r)-jt>=0;)r^=dn<<vt.getBCHDigit(r)-jt;return(o<<10|r)^Jn};var un={};const Yn=he;function Ee(t){this.mode=Yn.NUMERIC,this.data=t.toString()}Ee.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};Ee.prototype.getLength=function(){return this.data.length};Ee.prototype.getBitsLength=function(){return Ee.getBitsLength(this.data.length)};Ee.prototype.write=function(e){let n,o,r;for(n=0;n+3<=this.data.length;n+=3)o=this.data.substr(n,3),r=parseInt(o,10),e.put(r,10);const i=this.data.length-n;i>0&&(o=this.data.substr(n),r=parseInt(o,10),e.put(r,i*3+1))};var Xn=Ee;const Zn=he,ut=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Re(t){this.mode=Zn.ALPHANUMERIC,this.data=t}Re.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};Re.prototype.getLength=function(){return this.data.length};Re.prototype.getBitsLength=function(){return Re.getBitsLength(this.data.length)};Re.prototype.write=function(e){let n;for(n=0;n+2<=this.data.length;n+=2){let o=ut.indexOf(this.data[n])*45;o+=ut.indexOf(this.data[n+1]),e.put(o,11)}this.data.length%2&&e.put(ut.indexOf(this.data[n]),6)};var ei=Re,ti=function(e){for(var n=[],o=e.length,r=0;r<o;r++){var i=e.charCodeAt(r);if(i>=55296&&i<=56319&&o>r+1){var s=e.charCodeAt(r+1);s>=56320&&s<=57343&&(i=(i-55296)*1024+s-56320+65536,r+=1)}if(i<128){n.push(i);continue}if(i<2048){n.push(i>>6|192),n.push(i&63|128);continue}if(i<55296||i>=57344&&i<65536){n.push(i>>12|224),n.push(i>>6&63|128),n.push(i&63|128);continue}if(i>=65536&&i<=1114111){n.push(i>>18|240),n.push(i>>12&63|128),n.push(i>>6&63|128),n.push(i&63|128);continue}n.push(239,191,189)}return new Uint8Array(n).buffer};const ni=ti,ii=he;function _e(t){this.mode=ii.BYTE,typeof t=="string"&&(t=ni(t)),this.data=new Uint8Array(t)}_e.getBitsLength=function(e){return e*8};_e.prototype.getLength=function(){return this.data.length};_e.prototype.getBitsLength=function(){return _e.getBitsLength(this.data.length)};_e.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)};var oi=_e;const ri=he,si=U;function Se(t){this.mode=ri.KANJI,this.data=t}Se.getBitsLength=function(e){return e*13};Se.prototype.getLength=function(){return this.data.length};Se.prototype.getBitsLength=function(){return Se.getBitsLength(this.data.length)};Se.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let n=si.toSJIS(this.data[e]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),t.put(n,13)}};var ai=Se,hn={exports:{}};(function(t){var e={single_source_shortest_paths:function(n,o,r){var i={},s={};s[o]=0;var a=e.PriorityQueue.make();a.push(o,0);for(var l,c,h,R,C,y,v,f,w;!a.empty();){l=a.pop(),c=l.value,R=l.cost,C=n[c]||{};for(h in C)C.hasOwnProperty(h)&&(y=C[h],v=R+y,f=s[h],w=typeof s[h]>"u",(w||f>v)&&(s[h]=v,a.push(h,v),i[h]=c))}if(typeof r<"u"&&typeof s[r]>"u"){var p=["Could not find a path from ",o," to ",r,"."].join("");throw new Error(p)}return i},extract_shortest_path_from_predecessor_list:function(n,o){for(var r=[],i=o;i;)r.push(i),n[i],i=n[i];return r.reverse(),r},find_path:function(n,o,r){var i=e.single_source_shortest_paths(n,o,r);return e.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(n){var o=e.PriorityQueue,r={},i;n=n||{};for(i in o)o.hasOwnProperty(i)&&(r[i]=o[i]);return r.queue=[],r.sorter=n.sorter||o.default_sorter,r},default_sorter:function(n,o){return n.cost-o.cost},push:function(n,o){var r={value:n,cost:o};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(hn);var li=hn.exports;(function(t){const e=he,n=Xn,o=ei,r=oi,i=ai,s=Z,a=U,l=li;function c(p){return unescape(encodeURIComponent(p)).length}function h(p,m,b){const g=[];let x;for(;(x=p.exec(b))!==null;)g.push({data:x[0],index:x.index,mode:m,length:x[0].length});return g}function R(p){const m=h(s.NUMERIC,e.NUMERIC,p),b=h(s.ALPHANUMERIC,e.ALPHANUMERIC,p);let g,x;return a.isKanjiModeEnabled()?(g=h(s.BYTE,e.BYTE,p),x=h(s.KANJI,e.KANJI,p)):(g=h(s.BYTE_KANJI,e.BYTE,p),x=[]),m.concat(b,g,x).sort(function(B,K){return B.index-K.index}).map(function(B){return{data:B.data,mode:B.mode,length:B.length}})}function C(p,m){switch(m){case e.NUMERIC:return n.getBitsLength(p);case e.ALPHANUMERIC:return o.getBitsLength(p);case e.KANJI:return i.getBitsLength(p);case e.BYTE:return r.getBitsLength(p)}}function y(p){return p.reduce(function(m,b){const g=m.length-1>=0?m[m.length-1]:null;return g&&g.mode===b.mode?(m[m.length-1].data+=b.data,m):(m.push(b),m)},[])}function v(p){const m=[];for(let b=0;b<p.length;b++){const g=p[b];switch(g.mode){case e.NUMERIC:m.push([g,{data:g.data,mode:e.ALPHANUMERIC,length:g.length},{data:g.data,mode:e.BYTE,length:g.length}]);break;case e.ALPHANUMERIC:m.push([g,{data:g.data,mode:e.BYTE,length:g.length}]);break;case e.KANJI:m.push([g,{data:g.data,mode:e.BYTE,length:c(g.data)}]);break;case e.BYTE:m.push([{data:g.data,mode:e.BYTE,length:c(g.data)}])}}return m}function f(p,m){const b={},g={start:{}};let x=["start"];for(let W=0;W<p.length;W++){const B=p[W],K=[];for(let ae=0;ae<B.length;ae++){const J=B[ae],Ae=""+W+ae;K.push(Ae),b[Ae]={node:J,lastCount:0},g[Ae]={};for(let dt=0;dt<x.length;dt++){const ne=x[dt];b[ne]&&b[ne].node.mode===J.mode?(g[ne][Ae]=C(b[ne].lastCount+J.length,J.mode)-C(b[ne].lastCount,J.mode),b[ne].lastCount+=J.length):(b[ne]&&(b[ne].lastCount=J.length),g[ne][Ae]=C(J.length,J.mode)+4+e.getCharCountIndicator(J.mode,m))}}x=K}for(let W=0;W<x.length;W++)g[x[W]].end=0;return{map:g,table:b}}function w(p,m){let b;const g=e.getBestModeForData(p);if(b=e.from(m,g),b!==e.BYTE&&b.bit<g.bit)throw new Error('"'+p+'" cannot be encoded with mode '+e.toString(b)+`.
 Suggested mode is: `+e.toString(g));switch(b===e.KANJI&&!a.isKanjiModeEnabled()&&(b=e.BYTE),b){case e.NUMERIC:return new n(p);case e.ALPHANUMERIC:return new o(p);case e.KANJI:return new i(p);case e.BYTE:return new r(p)}}t.fromArray=function(m){return m.reduce(function(b,g){return typeof g=="string"?b.push(w(g,null)):g.data&&b.push(w(g.data,g.mode)),b},[])},t.fromString=function(m,b){const g=R(m,a.isKanjiModeEnabled()),x=v(g),W=f(x,b),B=l.find_path(W.map,"start","end"),K=[];for(let ae=1;ae<B.length-1;ae++)K.push(W.table[B[ae]].node);return t.fromArray(y(K))},t.rawSplit=function(m){return t.fromArray(R(m,a.isKanjiModeEnabled()))}})(un);const lt=U,ht=rt,ci=Un,di=zn,ui=tn,hi=nn,Ct=on,$t=st,fi=Vn,Je=an,pi=cn,gi=he,ft=un;function mi(t,e){const n=t.size,o=hi.getPositions(e);for(let r=0;r<o.length;r++){const i=o[r][0],s=o[r][1];for(let a=-1;a<=7;a++)if(!(i+a<=-1||n<=i+a))for(let l=-1;l<=7;l++)s+l<=-1||n<=s+l||(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4?t.set(i+a,s+l,!0,!0):t.set(i+a,s+l,!1,!0))}}function wi(t){const e=t.size;for(let n=8;n<e-8;n++){const o=n%2===0;t.set(n,6,o,!0),t.set(6,n,o,!0)}}function bi(t,e){const n=ui.getPositions(e);for(let o=0;o<n.length;o++){const r=n[o][0],i=n[o][1];for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)s===-2||s===2||a===-2||a===2||s===0&&a===0?t.set(r+s,i+a,!0,!0):t.set(r+s,i+a,!1,!0)}}function yi(t,e){const n=t.size,o=Je.getEncodedBits(e);let r,i,s;for(let a=0;a<18;a++)r=Math.floor(a/3),i=a%3+n-8-3,s=(o>>a&1)===1,t.set(r,i,s,!0),t.set(i,r,s,!0)}function pt(t,e,n){const o=t.size,r=pi.getEncodedBits(e,n);let i,s;for(i=0;i<15;i++)s=(r>>i&1)===1,i<6?t.set(i,8,s,!0):i<8?t.set(i+1,8,s,!0):t.set(o-15+i,8,s,!0),i<8?t.set(8,o-i-1,s,!0):i<9?t.set(8,15-i-1+1,s,!0):t.set(8,15-i-1,s,!0);t.set(o-8,8,1,!0)}function vi(t,e){const n=t.size;let o=-1,r=n-1,i=7,s=0;for(let a=n-1;a>0;a-=2)for(a===6&&a--;;){for(let l=0;l<2;l++)if(!t.isReserved(r,a-l)){let c=!1;s<e.length&&(c=(e[s]>>>i&1)===1),t.set(r,a-l,c),i--,i===-1&&(s++,i=7)}if(r+=o,r<0||n<=r){r-=o,o=-o;break}}}function Ci(t,e,n){const o=new ci;n.forEach(function(l){o.put(l.mode.bit,4),o.put(l.getLength(),gi.getCharCountIndicator(l.mode,t)),l.write(o)});const r=lt.getSymbolTotalCodewords(t),i=$t.getTotalCodewordsCount(t,e),s=(r-i)*8;for(o.getLengthInBits()+4<=s&&o.put(0,4);o.getLengthInBits()%8!==0;)o.putBit(0);const a=(s-o.getLengthInBits())/8;for(let l=0;l<a;l++)o.put(l%2?17:236,8);return $i(o,t,e)}function $i(t,e,n){const o=lt.getSymbolTotalCodewords(e),r=$t.getTotalCodewordsCount(e,n),i=o-r,s=$t.getBlocksCount(e,n),a=o%s,l=s-a,c=Math.floor(o/s),h=Math.floor(i/s),R=h+1,C=c-h,y=new fi(C);let v=0;const f=new Array(s),w=new Array(s);let p=0;const m=new Uint8Array(t.buffer);for(let B=0;B<s;B++){const K=B<l?h:R;f[B]=m.slice(v,v+K),w[B]=y.encode(f[B]),v+=K,p=Math.max(p,K)}const b=new Uint8Array(o);let g=0,x,W;for(x=0;x<p;x++)for(W=0;W<s;W++)x<f[W].length&&(b[g++]=f[W][x]);for(x=0;x<C;x++)for(W=0;W<s;W++)b[g++]=w[W][x];return b}function xi(t,e,n,o){let r;if(Array.isArray(t))r=ft.fromArray(t);else if(typeof t=="string"){let c=e;if(!c){const h=ft.rawSplit(t);c=Je.getBestVersionForData(h,n)}r=ft.fromString(t,c||40)}else throw new Error("Invalid data");const i=Je.getBestVersionForData(r,n);if(!i)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=i;else if(e<i)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+i+`.
`);const s=Ci(e,n,r),a=lt.getSymbolSize(e),l=new di(a);return mi(l,e),wi(l),bi(l,e),pt(l,n,0),e>=7&&yi(l,e),vi(l,s),isNaN(o)&&(o=Ct.getBestMask(l,pt.bind(null,l,n))),Ct.applyMask(o,l),pt(l,n,o),{modules:l,version:e,errorCorrectionLevel:n,maskPattern:o,segments:r}}Zt.create=function(e,n){if(typeof e>"u"||e==="")throw new Error("No input text");let o=ht.M,r,i;return typeof n<"u"&&(o=ht.from(n.errorCorrectionLevel,ht.M),r=Je.from(n.version),i=Ct.from(n.maskPattern),n.toSJISFunc&&lt.setToSJISFunction(n.toSJISFunc)),xi(e,r,o,i)};var fn={},It={};(function(t){function e(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let o=n.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+n);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(i){return[i,i]}))),o.length===6&&o.push("F","F");const r=parseInt(o.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:r&255,hex:"#"+o.slice(0,6).join("")}}t.getOptions=function(o){o||(o={}),o.color||(o.color={});const r=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,i=o.width&&o.width>=21?o.width:void 0,s=o.scale||4;return{width:i,scale:i?4:s,margin:r,color:{dark:e(o.color.dark||"#000000ff"),light:e(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},t.getScale=function(o,r){return r.width&&r.width>=o+r.margin*2?r.width/(o+r.margin*2):r.scale},t.getImageWidth=function(o,r){const i=t.getScale(o,r);return Math.floor((o+r.margin*2)*i)},t.qrToImageData=function(o,r,i){const s=r.modules.size,a=r.modules.data,l=t.getScale(s,i),c=Math.floor((s+i.margin*2)*l),h=i.margin*l,R=[i.color.light,i.color.dark];for(let C=0;C<c;C++)for(let y=0;y<c;y++){let v=(C*c+y)*4,f=i.color.light;if(C>=h&&y>=h&&C<c-h&&y<c-h){const w=Math.floor((C-h)/l),p=Math.floor((y-h)/l);f=R[a[w*s+p]?1:0]}o[v++]=f.r,o[v++]=f.g,o[v++]=f.b,o[v]=f.a}}})(It);(function(t){const e=It;function n(r,i,s){r.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=s,i.width=s,i.style.height=s+"px",i.style.width=s+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(i,s,a){let l=a,c=s;typeof l>"u"&&(!s||!s.getContext)&&(l=s,s=void 0),s||(c=o()),l=e.getOptions(l);const h=e.getImageWidth(i.modules.size,l),R=c.getContext("2d"),C=R.createImageData(h,h);return e.qrToImageData(C.data,i,l),n(R,c,h),R.putImageData(C,0,0),c},t.renderToDataURL=function(i,s,a){let l=a;typeof l>"u"&&(!s||!s.getContext)&&(l=s,s=void 0),l||(l={});const c=t.render(i,s,l),h=l.type||"image/png",R=l.rendererOpts||{};return c.toDataURL(h,R.quality)}})(fn);var pn={};const Ei=It;function Ut(t,e){const n=t.a/255,o=e+'="'+t.hex+'"';return n<1?o+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':o}function gt(t,e,n){let o=t+e;return typeof n<"u"&&(o+=" "+n),o}function Ri(t,e,n){let o="",r=0,i=!1,s=0;for(let a=0;a<t.length;a++){const l=Math.floor(a%e),c=Math.floor(a/e);!l&&!i&&(i=!0),t[a]?(s++,a>0&&l>0&&t[a-1]||(o+=i?gt("M",l+n,.5+c+n):gt("m",r,0),r=0,i=!1),l+1<e&&t[a+1]||(o+=gt("h",s),s=0)):r++}return o}pn.render=function(e,n,o){const r=Ei.getOptions(n),i=e.modules.size,s=e.modules.data,a=i+r.margin*2,l=r.color.light.a?"<path "+Ut(r.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",c="<path "+Ut(r.color.dark,"stroke")+' d="'+Ri(s,i,r.margin)+'"/>',h='viewBox="0 0 '+a+" "+a+'"',C='<svg xmlns="http://www.w3.org/2000/svg" '+(r.width?'width="'+r.width+'" height="'+r.width+'" ':"")+h+' shape-rendering="crispEdges">'+l+c+`</svg>
`;return typeof o=="function"&&o(null,C),C};const _i=Dn,xt=Zt,gn=fn,Si=pn;function kt(t,e,n,o,r){const i=[].slice.call(arguments,1),s=i.length,a=typeof i[s-1]=="function";if(!a&&!_i())throw new Error("Callback required as last argument");if(a){if(s<2)throw new Error("Too few arguments provided");s===2?(r=n,n=e,e=o=void 0):s===3&&(e.getContext&&typeof r>"u"?(r=o,o=void 0):(r=o,o=n,n=e,e=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(n=e,e=o=void 0):s===2&&!e.getContext&&(o=n,n=e,e=void 0),new Promise(function(l,c){try{const h=xt.create(n,o);l(t(h,e,o))}catch(h){c(h)}})}try{const l=xt.create(n,o);r(null,t(l,e,o))}catch(l){r(l)}}De.create=xt.create;De.toCanvas=kt.bind(null,gn.render);De.toDataURL=kt.bind(null,gn.renderToDataURL);De.toString=kt.bind(null,function(t,e,n){return Si.render(t,n)});const Ti=.1,zt=2.5,ie=7;function mt(t,e,n){return t===e?!1:(t-e<0?e-t:t-e)<=n+Ti}function Ii(t,e){const n=Array.prototype.slice.call(De.create(t,{errorCorrectionLevel:e}).modules.data,0),o=Math.sqrt(n.length);return n.reduce((r,i,s)=>(s%o===0?r.push([i]):r[r.length-1].push(i))&&r,[])}const ki={generate({uri:t,size:e,logoSize:n,padding:o=8,dotColor:r="var(--apkt-colors-black)"}){const s=[],a=Ii(t,"Q"),l=(e-2*o)/a.length,c=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];c.forEach(({x:f,y:w})=>{const p=(a.length-ie)*l*f+o,m=(a.length-ie)*l*w+o,b=.45;for(let g=0;g<c.length;g+=1){const x=l*(ie-g*2);s.push(We`
            <rect
              fill=${g===2?"var(--apkt-colors-black)":"var(--apkt-colors-white)"}
              width=${g===0?x-10:x}
              rx= ${g===0?(x-10)*b:x*b}
              ry= ${g===0?(x-10)*b:x*b}
              stroke=${r}
              stroke-width=${g===0?10:0}
              height=${g===0?x-10:x}
              x= ${g===0?m+l*g+10/2:m+l*g}
              y= ${g===0?p+l*g+10/2:p+l*g}
            />
          `)}});const h=Math.floor((n+25)/l),R=a.length/2-h/2,C=a.length/2+h/2-1,y=[];a.forEach((f,w)=>{f.forEach((p,m)=>{if(a[w][m]&&!(w<ie&&m<ie||w>a.length-(ie+1)&&m<ie||w<ie&&m>a.length-(ie+1))&&!(w>R&&w<C&&m>R&&m<C)){const b=w*l+l/2+o,g=m*l+l/2+o;y.push([b,g])}})});const v={};return y.forEach(([f,w])=>{var p;v[f]?(p=v[f])==null||p.push(w):v[f]=[w]}),Object.entries(v).map(([f,w])=>{const p=w.filter(m=>w.every(b=>!mt(m,b,l)));return[Number(f),p]}).forEach(([f,w])=>{w.forEach(p=>{s.push(We`<circle cx=${f} cy=${p} fill=${r} r=${l/zt} />`)})}),Object.entries(v).filter(([f,w])=>w.length>1).map(([f,w])=>{const p=w.filter(m=>w.some(b=>mt(m,b,l)));return[Number(f),p]}).map(([f,w])=>{w.sort((m,b)=>m<b?-1:1);const p=[];for(const m of w){const b=p.find(g=>g.some(x=>mt(m,x,l)));b?b.push(m):p.push([m])}return[f,p.map(m=>[m[0],m[m.length-1]])]}).forEach(([f,w])=>{w.forEach(([p,m])=>{s.push(We`
              <line
                x1=${f}
                x2=${f}
                y1=${p}
                y2=${m}
                stroke=${r}
                stroke-width=${l/(zt/2)}
                stroke-linecap="round"
              />
            `)})}),s}},Ai=P`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({colors:t})=>t.white};
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  :host {
    border-radius: ${({borderRadius:t})=>t[4]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({tokens:t})=>t.theme.backgroundPrimary};
    border-radius: ${({borderRadius:t})=>t[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`;var fe=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Y=class extends k{constructor(){super(...arguments),this.uri="",this.size=500,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),d`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`}templateSvg(){return We`
      <svg viewBox="0 0 ${this.size} ${this.size}" width="100%" height="100%">
        ${ki.generate({uri:this.uri,size:this.size,logoSize:this.arenaClear?0:this.size/4})}
      </svg>
    `}templateVisual(){return this.imageSrc?d`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?d`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:d`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};Y.styles=[V,Ai];fe([u()],Y.prototype,"uri",void 0);fe([u({type:Number})],Y.prototype,"size",void 0);fe([u()],Y.prototype,"theme",void 0);fe([u()],Y.prototype,"imageSrc",void 0);fe([u()],Y.prototype,"alt",void 0);fe([u({type:Boolean})],Y.prototype,"arenaClear",void 0);fe([u({type:Boolean})],Y.prototype,"farcaster",void 0);Y=fe([I("wui-qr-code")],Y);const Wi=P`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:t})=>t.theme.foregroundSecondary} 0%,
      ${({tokens:t})=>t.theme.foregroundTertiary} 50%,
      ${({tokens:t})=>t.theme.foregroundSecondary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1s ease-in-out infinite;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:t})=>t[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;var Ue=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let ve=class extends k{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",d`<slot></slot>`}};ve.styles=[Wi];Ue([u()],ve.prototype,"width",void 0);Ue([u()],ve.prototype,"height",void 0);Ue([u()],ve.prototype,"variant",void 0);Ue([u({type:Boolean})],ve.prototype,"rounded",void 0);ve=Ue([I("wui-shimmer")],ve);const Pi=P`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:t})=>t[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var mn=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Ye=class extends L{constructor(){super(),this.basic=!1}firstUpdated(){var e,n,o;this.basic||O.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:((e=this.wallet)==null?void 0:e.name)??"WalletConnect",platform:"qrcode",displayIndex:(n=this.wallet)==null?void 0:n.display_index,walletRank:(o=this.wallet)==null?void 0:o.order,view:E.state.view}})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.unsubscribe)==null||e.forEach(n=>n())}render(){return this.onRenderProxy(),d`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","5","5","5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0)}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.wallet?this.wallet.name:void 0;return _.setWcLinking(void 0),_.setRecentWallet(this.wallet),d` <wui-qr-code
      theme=${bt.state.themeMode}
      uri=${this.uri}
      imageSrc=${A(de.getWalletImage(this.wallet))}
      color=${A(bt.state.themeVariables["--w3m-qr-color"])}
      alt=${A(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return d`<wui-button
      .disabled=${e}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};Ye.styles=Pi;mn([u({type:Boolean})],Ye.prototype,"basic",void 0);Ye=mn([I("w3m-connecting-wc-qrcode")],Ye);var Bi=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Ft=class extends k{constructor(){var e,n,o;if(super(),this.wallet=(e=E.state.data)==null?void 0:e.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");O.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:(n=this.wallet)==null?void 0:n.display_index,walletRank:(o=this.wallet)==null?void 0:o.order,view:E.state.view}})}render(){return d`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${A(de.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Ft=Bi([I("w3m-connecting-wc-unsupported")],Ft);var wn=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Et=class extends L{constructor(){var e,n;if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=Qt.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(_.subscribeKey("wcUri",()=>{this.updateLoadingState()})),O.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:(e=this.wallet)==null?void 0:e.display_index,walletRank:(n=this.wallet)==null?void 0:n.order,view:E.state.view}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:n,name:o}=this.wallet,{redirect:r,href:i}=S.formatUniversalUrl(n,this.uri);_.setWcLinking({name:o,href:i}),_.setRecentWallet(this.wallet),S.openHref(r,"_blank")}catch{this.error=!0}}};wn([$()],Et.prototype,"isLoading",void 0);Et=wn([I("w3m-connecting-wc-web")],Et);const Li=P`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`;var $e=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let re=class extends k{constructor(){var e;super(),this.wallet=(e=E.state.data)==null?void 0:e.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!N.state.siwx,this.remoteFeatures=N.state.remoteFeatures,this.displayBranding=!0,this.basic=!1,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(N.subscribeKey("remoteFeatures",n=>this.remoteFeatures=n))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return N.state.enableMobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),d`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){var e;return!((e=this.remoteFeatures)!=null&&e.reownBranding)||!this.displayBranding?null:d`<wui-ux-by-reown></wui-ux-by-reown>`}async initializeConnection(e=!1){var n,o;if(!(this.platform==="browser"||N.state.manualWCControl&&!e))try{const{wcPairingExpiry:r,status:i}=_.state,{redirectView:s}=E.state.data??{};if(e||N.state.enableEmbedded||S.isPairingExpired(r)||i==="connecting"){const a=_.getConnections(le.state.activeChain),l=(n=this.remoteFeatures)==null?void 0:n.multiWallet,c=a.length>0;await _.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(c&&l?(E.replace("ProfileWallets"),Le.showSuccess("New Wallet Added")):s?E.replace(s):Ht.close())}}catch(r){if(r instanceof Error&&r.message.includes("An error occurred when attempting to switch chain")&&!N.state.enableNetworkSwitch&&le.state.activeChain){le.setActiveCaipNetwork(xn.getUnsupportedNetwork(`${le.state.activeChain}:${(o=le.state.activeCaipNetwork)==null?void 0:o.id}`)),le.showUnsupportedChainUI();return}r instanceof Kt&&r.originalName===Gt.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?O.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:r.message}}):O.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(r==null?void 0:r.message)??"Unknown"}}),_.setWcError(!0),Le.showError(r.message??"Connection error"),_.resetWcConnection(),E.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:n,webapp_link:o,injected:r,rdns:i}=this.wallet,s=r==null?void 0:r.map(({injected_id:v})=>v).filter(Boolean),a=[...i?[i]:s??[]],l=N.state.isUniversalProvider?!1:a.length,c=e,h=o,R=_.checkInstalled(a),C=l&&R,y=n&&!S.isMobile();C&&!le.state.noAdapters&&this.platforms.push("browser"),c&&this.platforms.push(S.isMobile()?"mobile":"qrcode"),h&&this.platforms.push("web"),y&&this.platforms.push("desktop"),!C&&l&&!le.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return d`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return d`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return d`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return d`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return d`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;default:return d`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?d`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){var o;const n=(o=this.shadowRoot)==null?void 0:o.querySelector("div");n&&(await n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,n.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};re.styles=Li;$e([$()],re.prototype,"platform",void 0);$e([$()],re.prototype,"platforms",void 0);$e([$()],re.prototype,"isSiwxEnabled",void 0);$e([$()],re.prototype,"remoteFeatures",void 0);$e([u({type:Boolean})],re.prototype,"displayBranding",void 0);$e([u({type:Boolean})],re.prototype,"basic",void 0);re=$e([I("w3m-connecting-wc-view")],re);var At=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Xe=class extends k{constructor(){super(),this.unsubscribe=[],this.isMobile=S.isMobile(),this.remoteFeatures=N.state.remoteFeatures,this.unsubscribe.push(N.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(this.isMobile){const{featured:e,recommended:n}=T.state,{customWallets:o}=N.state,r=En.getRecentWallets(),i=e.length||n.length||(o==null?void 0:o.length)||r.length;return d`<wui-flex flexDirection="column" gap="2" .margin=${["1","3","3","3"]}>
        ${i?d`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return d`<wui-flex flexDirection="column" .padding=${["0","0","4","0"]}>
        <w3m-connecting-wc-view ?basic=${!0} .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","3","0","3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){var e;return(e=this.remoteFeatures)!=null&&e.reownBranding?d` <wui-flex flexDirection="column" .padding=${["1","0","1","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};At([$()],Xe.prototype,"isMobile",void 0);At([$()],Xe.prototype,"remoteFeatures",void 0);Xe=At([I("w3m-connecting-wc-basic-view")],Xe);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ni=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=(t,e)=>{var o;const n=t._$AN;if(n===void 0)return!1;for(const r of n)(o=r._$AO)==null||o.call(r,e,!1),Be(r,e);return!0},Ze=t=>{let e,n;do{if((e=t._$AM)===void 0)break;n=e._$AN,n.delete(t),t=e}while((n==null?void 0:n.size)===0)},bn=t=>{for(let e;e=t._$AM;t=e){let n=e._$AN;if(n===void 0)e._$AN=n=new Set;else if(n.has(t))break;n.add(t),Di(e)}};function Oi(t){this._$AN!==void 0?(Ze(this),this._$AM=t,bn(this)):this._$AM=t}function Mi(t,e=!1,n=0){const o=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(o))for(let i=n;i<o.length;i++)Be(o[i],!1),Ze(o[i]);else o!=null&&(Be(o,!1),Ze(o));else Be(this,t)}const Di=t=>{t.type==_n.CHILD&&(t._$AP??(t._$AP=Mi),t._$AQ??(t._$AQ=Oi))};class ji extends Rn{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,n,o){super._$AT(e,n,o),bn(this),this.isConnected=e._$AU}_$AO(e,n=!0){var o,r;e!==this.isConnected&&(this.isConnected=e,e?(o=this.reconnected)==null||o.call(this):(r=this.disconnected)==null||r.call(this)),n&&(Be(this,e),Ze(this))}setValue(e){if(Ni(this._$Ct))this._$Ct._$AI(e,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=e,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=()=>new Ui;class Ui{}const wt=new WeakMap,Pt=Sn(class extends ji{render(t){return Nt}update(t,[e]){var o;const n=e!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=e,this.ht=(o=t.options)==null?void 0:o.host,this.rt(this.ct=t.element)),Nt}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let n=wt.get(e);n===void 0&&(n=new WeakMap,wt.set(e,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){var t,e;return typeof this.G=="function"?(t=wt.get(this.ht??globalThis))==null?void 0:t.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),zi=P`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      color ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      border ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      width ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      height ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      transform ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      opacity ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({colors:t})=>t.neutrals300};
    border-radius: ${({borderRadius:t})=>t.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      color ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      border ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      width ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      height ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      transform ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      opacity ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:t})=>t.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:t})=>t.core.iconAccentPrimary};
    background-color: ${({tokens:t})=>t.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:t})=>t.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:t})=>t.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:t})=>t.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:t})=>t.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:t})=>t.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:t})=>t.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:t})=>t.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:t})=>t.theme.textTertiary};
  }
`;var ct=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Te=class extends k{constructor(){super(...arguments),this.inputElementRef=Wt(),this.checked=!1,this.disabled=!1,this.size="md"}render(){return d`
      <label data-size=${this.size}>
        <input
          ${Pt(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){var e;this.dispatchEvent(new CustomEvent("switchChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.checked,bubbles:!0,composed:!0}))}};Te.styles=[V,ue,zi];ct([u({type:Boolean})],Te.prototype,"checked",void 0);ct([u({type:Boolean})],Te.prototype,"disabled",void 0);ct([u()],Te.prototype,"size",void 0);Te=ct([I("wui-toggle")],Te);const Fi=P`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:t})=>t[2]};
    padding: ${({spacing:t})=>t[2]} ${({spacing:t})=>t[3]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:t})=>t.theme.foregroundPrimary};
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var yn=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let et=class extends k{constructor(){super(...arguments),this.checked=!1}render(){return d`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(e){e.stopPropagation(),this.checked=e.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("certifiedSwitchChange",{detail:this.checked,bubbles:!0,composed:!0}))}};et.styles=[V,ue,Fi];yn([u({type:Boolean})],et.prototype,"checked",void 0);et=yn([I("wui-certified-switch")],et);const Vi=P`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.textPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[3]} ${({spacing:t})=>t[10]};
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t["lg-regular"].lineHeight};
    letter-spacing: ${({typography:t})=>t["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:t})=>t[4]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[4]} ${({spacing:t})=>t[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:t})=>t[4]};
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:t})=>t[2]};
    color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:t})=>t[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var q=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let M=class extends k{constructor(){super(...arguments),this.inputElementRef=Wt(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return d` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${Pt(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${A(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?d`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){var e;return this.onSubmit?d`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${(e=this.onSubmit)==null?void 0:e.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?d`<wui-icon name="spinner" size="md"></wui-icon>`:d`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?d`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?d`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){var e;this.dispatchEvent(new CustomEvent("inputChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.value,bubbles:!0,composed:!0}))}};M.styles=[V,ue,Vi];q([u()],M.prototype,"icon",void 0);q([u({type:Boolean})],M.prototype,"disabled",void 0);q([u({type:Boolean})],M.prototype,"loading",void 0);q([u()],M.prototype,"placeholder",void 0);q([u()],M.prototype,"type",void 0);q([u()],M.prototype,"value",void 0);q([u()],M.prototype,"errorText",void 0);q([u()],M.prototype,"warningText",void 0);q([u()],M.prototype,"onSubmit",void 0);q([u()],M.prototype,"size",void 0);q([u({attribute:!1})],M.prototype,"onKeyDown",void 0);M=q([I("wui-input-text")],M);const qi=P`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:t})=>t[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:t})=>t[4]};
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }
`;var vn=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let tt=class extends k{constructor(){super(...arguments),this.inputComponentRef=Wt(),this.inputValue=""}render(){return d`
      <wui-input-text
        ${Pt(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?d`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(e){this.inputValue=e.detail||""}clearValue(){const e=this.inputComponentRef.value,n=e==null?void 0:e.inputElementRef.value;n&&(n.value="",this.inputValue="",n.focus(),n.dispatchEvent(new Event("input")))}};tt.styles=[V,qi];vn([u()],tt.prototype,"inputValue",void 0);tt=vn([I("wui-search-bar")],tt);const Hi=We`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,Ki=P`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:t})=>t[2]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:t})=>t.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var Cn=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let nt=class extends k{constructor(){super(...arguments),this.type="wallet"}render(){return d`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?d` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${Hi}`:d`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};nt.styles=[V,ue,Ki];Cn([u()],nt.prototype,"type",void 0);nt=Cn([I("wui-card-select-loader")],nt);const Gi=Jt`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var H=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let D=class extends k{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding&&oe.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&oe.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&oe.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&oe.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&oe.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&oe.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&oe.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&oe.getSpacingStyles(this.margin,3)};
    `,d`<slot></slot>`}};D.styles=[V,Gi];H([u()],D.prototype,"gridTemplateRows",void 0);H([u()],D.prototype,"gridTemplateColumns",void 0);H([u()],D.prototype,"justifyItems",void 0);H([u()],D.prototype,"alignItems",void 0);H([u()],D.prototype,"justifyContent",void 0);H([u()],D.prototype,"alignContent",void 0);H([u()],D.prototype,"columnGap",void 0);H([u()],D.prototype,"rowGap",void 0);H([u()],D.prototype,"gap",void 0);H([u()],D.prototype,"padding",void 0);H([u()],D.prototype,"margin",void 0);D=H([I("wui-grid")],D);const Qi=P`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:t})=>t[2]};
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[0]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:t})=>t[4]}, 20px);
    transition:
      color ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-1"]},
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-1"]},
      border-radius ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:t})=>t.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:t})=>t.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:t})=>t.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:t})=>t.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:t})=>t.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var ee=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let z=class extends k{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.isImpressed=!1,this.explorerId="",this.walletQuery="",this.certified=!1,this.displayIndex=0,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(n=>{n.isIntersecting?(this.visible=!0,this.fetchImageSrc(),this.sendImpressionEvent()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var n,o;const e=((n=this.wallet)==null?void 0:n.badge_type)==="certified";return d`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${A(e?"certified":void 0)}
            >${(o=this.wallet)==null?void 0:o.name}</wui-text
          >
          ${e?d`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){var e,n;return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():d`
      <wui-wallet-image
        size="lg"
        imageSrc=${A(this.imageSrc)}
        name=${A((e=this.wallet)==null?void 0:e.name)}
        .installed=${((n=this.wallet)==null?void 0:n.installed)??!1}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return d`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=de.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await de.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}sendImpressionEvent(){!this.wallet||this.isImpressed||(this.isImpressed=!0,O.sendWalletImpressionEvent({name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.explorerId,view:E.state.view,query:this.walletQuery,certified:this.certified,displayIndex:this.displayIndex}))}};z.styles=Qi;ee([$()],z.prototype,"visible",void 0);ee([$()],z.prototype,"imageSrc",void 0);ee([$()],z.prototype,"imageLoading",void 0);ee([$()],z.prototype,"isImpressed",void 0);ee([u()],z.prototype,"explorerId",void 0);ee([u()],z.prototype,"walletQuery",void 0);ee([u()],z.prototype,"certified",void 0);ee([u()],z.prototype,"displayIndex",void 0);ee([u({type:Object})],z.prototype,"wallet",void 0);z=ee([I("w3m-all-wallets-list-item")],z);const Ji=P`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:t})=>t[4]};
    padding-bottom: ${({spacing:t})=>t[4]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var pe=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};const Vt="local-paginator";let X=class extends k{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!T.state.wallets.length,this.wallets=T.state.wallets,this.recommended=T.state.recommended,this.featured=T.state.featured,this.filteredWallets=T.state.filteredWallets,this.mobileFullScreen=N.state.enableMobileFullScreen,this.unsubscribe.push(T.subscribeKey("wallets",e=>this.wallets=e),T.subscribeKey("recommended",e=>this.recommended=e),T.subscribeKey("featured",e=>this.featured=e),T.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var e;this.unsubscribe.forEach(n=>n()),(e=this.paginationObserver)==null||e.disconnect()}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),d`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","3","3","3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var n;this.loading=!0;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("wui-grid");e&&(await T.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,n){return[...Array(e)].map(()=>d`
        <wui-card-select-loader type="wallet" id=${A(n)}></wui-card-select-loader>
      `)}getWallets(){var r;const e=[...this.featured,...this.recommended];((r=this.filteredWallets)==null?void 0:r.length)>0?e.push(...this.filteredWallets):e.push(...this.wallets);const n=S.uniqueBy(e,"id"),o=yt.markWalletsAsInstalled(n);return yt.markWalletsWithDisplayIndex(o)}walletsTemplate(){return this.getWallets().map((n,o)=>d`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${n.id}"
          @click=${()=>this.onConnectWallet(n)}
          .wallet=${n}
          explorerId=${n.id}
          certified=${this.badge==="certified"}
          displayIndex=${o}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:n,featured:o,count:r,mobileFilteredOutWalletsLength:i}=T.state,s=window.innerWidth<352?3:4,a=e.length+n.length;let c=Math.ceil(a/s)*s-a+s;return c-=e.length?o.length%s:0,r===0&&o.length>0?null:r===0||[...o,...e,...n].length<r-(i??0)?this.shimmerTemplate(c,Vt):null}createPaginationObserver(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector(`#${Vt}`);e&&(this.paginationObserver=new IntersectionObserver(([o])=>{if(o!=null&&o.isIntersecting&&!this.loading){const{page:r,count:i,wallets:s}=T.state;s.length<i&&T.fetchWalletsByPage({page:r+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){j.selectWalletConnector(e)}};X.styles=Ji;pe([$()],X.prototype,"loading",void 0);pe([$()],X.prototype,"wallets",void 0);pe([$()],X.prototype,"recommended",void 0);pe([$()],X.prototype,"featured",void 0);pe([$()],X.prototype,"filteredWallets",void 0);pe([$()],X.prototype,"badge",void 0);pe([$()],X.prototype,"mobileFullScreen",void 0);X=pe([I("w3m-all-wallets-list")],X);const Yi=Jt`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var ze=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let Ce=class extends k{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.mobileFullScreen=N.state.enableMobileFullScreen,this.query=""}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.onSearch(),this.loading?d`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await T.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=T.state,n=yt.markWalletsAsInstalled(e);return e.length?d`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","3","3","3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${n.map((o,r)=>d`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(o)}
              .wallet=${o}
              data-testid="wallet-search-item-${o.id}"
              explorerId=${o.id}
              certified=${this.badge==="certified"}
              walletQuery=${this.query}
              displayIndex=${r}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:d`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){j.selectWalletConnector(e)}};Ce.styles=Yi;ze([$()],Ce.prototype,"loading",void 0);ze([$()],Ce.prototype,"mobileFullScreen",void 0);ze([u()],Ce.prototype,"query",void 0);ze([u()],Ce.prototype,"badge",void 0);Ce=ze([I("w3m-all-wallets-search")],Ce);var Bt=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let it=class extends k{constructor(){super(...arguments),this.search="",this.badge=void 0,this.onDebouncedSearch=S.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return d`
      <wui-flex .padding=${["1","3","3","3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge==="certified"}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?d`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:d`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onCertifiedSwitchChange(e){e.detail?(this.badge="certified",Le.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return S.isMobile()?d`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){E.push("ConnectingWalletConnect")}};Bt([$()],it.prototype,"search",void 0);Bt([$()],it.prototype,"badge",void 0);it=Bt([I("w3m-all-wallets-view")],it);const Xi=P`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:t})=>t[3]};
    width: 100%;
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    border-radius: ${({borderRadius:t})=>t[4]};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      scale ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var te=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let F=class extends k{constructor(){super(...arguments),this.imageSrc="google",this.loading=!1,this.disabled=!1,this.rightIcon=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",d`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        tabindex=${A(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?d`<wui-image
        icon=${this.icon}
        iconColor=${A(this.iconColor)}
        ?boxed=${!0}
        ?rounded=${this.rounded}
      ></wui-image>`:d`<wui-image
      ?boxed=${!0}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      src=${this.imageSrc}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?d`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:d`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};F.styles=[V,ue,Xi];te([u()],F.prototype,"imageSrc",void 0);te([u()],F.prototype,"icon",void 0);te([u()],F.prototype,"iconColor",void 0);te([u({type:Boolean})],F.prototype,"loading",void 0);te([u()],F.prototype,"tabIdx",void 0);te([u({type:Boolean})],F.prototype,"disabled",void 0);te([u({type:Boolean})],F.prototype,"rightIcon",void 0);te([u({type:Boolean})],F.prototype,"rounded",void 0);te([u({type:Boolean})],F.prototype,"fullSize",void 0);F=te([I("wui-list-item")],F);var Zi=function(t,e,n,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,n):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(i=(r<3?s(i):r>3?s(e,n,i):s(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i};let qt=class extends k{constructor(){var e;super(...arguments),this.wallet=(e=E.state.data)==null?void 0:e.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return d`
      <wui-flex gap="2" flexDirection="column" .padding=${["3","3","4","3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var e;return(e=this.wallet)!=null&&e.chrome_store?d`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var e;return(e=this.wallet)!=null&&e.app_store?d`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var e;return(e=this.wallet)!=null&&e.play_store?d`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var e;return(e=this.wallet)!=null&&e.homepage?d`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}openStore(e){e.href&&this.wallet&&(O.sendEvent({type:"track",event:"GET_WALLET",properties:{name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.wallet.id,type:e.type}}),S.openHref(e.href,"_blank"))}onChromeStore(){var e;(e=this.wallet)!=null&&e.chrome_store&&this.openStore({href:this.wallet.chrome_store,type:"chrome_store"})}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&this.openStore({href:this.wallet.app_store,type:"app_store"})}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&this.openStore({href:this.wallet.play_store,type:"play_store"})}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&this.openStore({href:this.wallet.homepage,type:"homepage"})}};qt=Zi([I("w3m-downloads-view")],qt);export{it as W3mAllWalletsView,Xe as W3mConnectingWcBasicView,qt as W3mDownloadsView};
