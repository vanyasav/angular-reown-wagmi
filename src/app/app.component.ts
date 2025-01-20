import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppKit, createAppKit, EventsControllerState } from '@reown/appkit';
import { immutableZkEvmTestnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { version, dependencies } from '../../package.json';

const PROJECT_ID = '52dd9241e6d4b51c3b077e73d87d7648';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements OnInit {
  protected version = version;
  protected appkit = dependencies['@reown/appkit'];
  private modal!: AppKit;

  ngOnInit(): void {
    const networks = [immutableZkEvmTestnet];

    const wagmiAdapter = new WagmiAdapter({
      projectId: PROJECT_ID,
      networks,
    });

    const metadata = {
      name: 'AppKit',
      description: 'AppKit Example',
      url: 'https://example.com',
      icons: ['https://avatars.githubusercontent.com/u/179229932'],
    };

    this.modal = createAppKit({
      allWallets: 'HIDE',
      adapters: [wagmiAdapter],
      networks: [immutableZkEvmTestnet],
      metadata,
      allowUnsupportedChain: false,
      projectId: PROJECT_ID,
      features: {
        email: false,
        socials: false,
        swaps: false,
        onramp: false,
        history: false,
      },
      featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      ],
      includeWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      ],
      themeMode: 'dark',
    });

    this.modal.subscribeEvents((event: EventsControllerState) => {
      console.log(JSON.parse(JSON.stringify(event.data)));
    });
    this.modal.subscribeCaipNetworkChange((data) =>
      console.log(JSON.parse(JSON.stringify(data))),
    );
    this.modal.subscribeShouldUpdateToAddress((data) =>
      console.log(JSON.parse(JSON.stringify(data))),
    );
    this.modal.subscribeState((data) =>
      console.log(JSON.parse(JSON.stringify(data))),
    );
    this.modal.subscribeWalletInfo((data) => console.log(data));
  }

  connectWallet() {
    this.modal.open().then(() => {});
  }

  openNetworks() {
    this.modal.open({ view: 'Networks' }).then(() => {});
  }
}
