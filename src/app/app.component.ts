import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppKit, createAppKit, EventsControllerState } from '@reown/appkit';
import { immutableZkEvmTestnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-reown-wagmi';
  modal!: AppKit;

  ngOnInit(): void {
    // 1. Get a project ID at https://cloud.reown.com
    const projectId = '';

    const networks = [immutableZkEvmTestnet];

    // 2. Set up Wagmi adapter
    const wagmiAdapter = new WagmiAdapter({
      projectId,
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
      allWallets: 'HIDE',
      adapters: [wagmiAdapter],
      networks: [immutableZkEvmTestnet],
      metadata,
      projectId,
      features: {
        email: false,
        socials: false,
        swaps: false,
        onramp: false,
        history: false,
      },
      featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
        'e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4',
      ],
      includeWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
        'e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4',
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
}
