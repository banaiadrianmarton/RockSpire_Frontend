import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  selectedDescription: string | null = null;

  descriptions: { [key: string]: string } = {
    stage:
      'A színpad a fesztivál szíve, ahol a legjobb bandák és előadók lépnek fel. Itt találkozhatsz a legnagyobb zenekarokkal, akik pörgetik fel a hangulatot. A színpad körül egyedülálló atmoszféra és zenei élmények várnak. Ne hagyd ki a legnépszerűbb előadásokat, amelyek garantáltan felejthetetlen élményeket nyújtanak!',
    food: 'A étkezdék a fesztivál gasztronómiai központja, ahol különféle étkezési lehetőségek közül válogathatsz. Fedezd fel a helyi ízeket, nemzetközi étkezési lehetőségeket, és próbálj ki új, izgalmas fogásokat! Legyen szó gyors étkezésről vagy egy kiadós étkezésről, itt biztosan találsz valamit, ami kielégíti étvágyadat.',
    merch:
      'Az ajándékboltok a fesztivál igazi kincsesbányái! Itt vásárolhatod meg a kedvenc zenekaraid merch termékeit, mint például pólók, poszterek, sapkák, albumok és egyéb egyedi ajándékok. Ha igazán el szeretnéd vinni magaddal a fesztivál hangulatát, mindenképpen nézz körül a merch standokon, hogy egyedi relikviákkal térhess haza!',
    camping:
      'A kemping a fesztivál egyik legnépszerűbb pihenőzónája, ahol sátrakban vagy mobilházakban szállhatsz meg. Ideális választás azoknak, akik közel szeretnének maradni a programokhoz, mégis szeretnének nyugodtan pihenni. A kempinghangulat igazi közösségi élményt nyújt, barátkozz, grillezz, és élvezd a természet közelségét a fesztivál forgatagában!',
    medicalTent:
      'Az orvosi sátor a fesztivál biztonságának egyik kulcspontja, ahol szakképzett egészségügyi személyzet segít, ha bármilyen probléma adódik. Legyen szó kisebb sérülésről vagy rosszullétről, itt gyors és szakszerű ellátásban részesülhetsz. Fontos tudni, hol található, hogy szükség esetén azonnal segítséget kaphass!',
    parking:
      'A parkoló terület biztosítja, hogy az autósoknak se okozzon gondot a biztonságos parkolás. Könnyű megközelíthetőség és átgondolt elrendezés jellemzi a parkolót.',
  };

  showDescription(areaId: string): void {
    this.selectedDescription = areaId;  
  }
}
