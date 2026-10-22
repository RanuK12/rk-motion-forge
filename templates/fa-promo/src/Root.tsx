import {Composition} from 'remotion';
import {Promo, promoDefaults, totalFrames} from './Promo';
export const Root = () => (
  <Composition id="Promo" component={Promo} width={1080} height={1920} fps={30}
    durationInFrames={totalFrames(promoDefaults)} defaultProps={promoDefaults}/>
);
