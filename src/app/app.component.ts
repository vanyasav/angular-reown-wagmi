import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppKit, createAppKit, EventsControllerState } from '@reown/appkit';
import { immutableZkEvmTestnet, mainnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const PROJECT_ID = '805d239b9d2006f32d648af4fc26f713';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  modal!: AppKit;

  ngOnInit(): void {
    const networks = [immutableZkEvmTestnet];

    // 2. Set up Wagmi adapter
    const wagmiAdapter = new WagmiAdapter({
      projectId: PROJECT_ID,
      networks,
    });

    // 3. Configure the metadata
    const metadata = {
      name: 'AppKit',
      description: 'AppKit Example',
      url: 'https://example.com', // origin must match your domain & subdomain
      icons: ['https://avatars.githubusercontent.com/u/179229932'],
    };

    // 3. Create the modal
    this.modal = createAppKit({
      allWallets: 'SHOW',
      adapters: [wagmiAdapter],
      networks: [immutableZkEvmTestnet],
      metadata,
      projectId: PROJECT_ID,
      // featuredWalletIds: [
      //   'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      // ],
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
