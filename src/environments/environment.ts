export const environment = {
  production: false,
  config: {
    useWelcomeStages: true,
    animations: {
      welcome: {
        /** 
        titles: {
          logoEnter: { initialVerticalOffset: '200px', duration: '700ms', delay: '0ms' },
          descriptionEnter: { initialVerticalOffset: '200px', duration: '700ms', delay: '200ms' },
          leave: { duration: '400ms' }
        },
        */
        titles: {
          enter: [
            { initialVerticalOffset: '50px', duration: '400ms', delay: '0ms' },
            { initialVerticalOffset: '50px', duration: '400ms', delay: '200ms' },
            { initialVerticalOffset: '50px', duration: '400ms', delay: '400ms' }
          ],
          leave: { scaling: '1.5', duration: '400ms' }
        }
      }
    },
    background: {
      color: '#FFFFFF',
      circularWipe: {
        welcome: {
          initialBackgroundColor: '#fff',
          finalBackgroundColor: '#eeeeee',
          durationInMilliseconds: 1300
        },
      }
    }
  }

};