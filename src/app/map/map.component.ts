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
    stage1:
      'A színpad a fesztivál szíve, ahol a legjobb bandák és előadók lépnek fel. Itt találkozhatsz a legnagyobb zenekarokkal, akik pörgetik fel a hangulatot. A színpad körül egyedülálló atmoszféra és zenei élmények várnak. Ne hagyd ki a legnépszerűbb előadásokat, amelyek garantáltan felejthetetlen élményeket nyújtanak!',
    food: 'A étkezdék a fesztivál gasztronómiai központja, ahol különféle étkezési lehetőségek közül válogathatsz. Fedezd fel a helyi ízeket, nemzetközi étkezési lehetőségeket, és próbálj ki új, izgalmas fogásokat! Legyen szó gyors étkezésről vagy egy kiadós étkezésről, itt biztosan találsz valamit, ami kielégíti étvágyadat.',
    merch:
      'Az ajándékboltok a fesztivál igazi kincsesbányái! Itt vásárolhatod meg a kedvenc zenekaraid merch termékeit, mint például pólók, poszterek, sapkák, albumok és egyéb egyedi ajándékok. Ha igazán el szeretnéd vinni magaddal a fesztivál hangulatát, mindenképpen nézz körül a merch standokon, hogy egyedi relikviákkal térhess haza!',
    mobilHouse:
      'A mobilházak kényelmes és praktikus pihenőhelyet biztosítanak, ha egy kis nyugalomra van szükséged a fesztivál forgatagában. Ezek a komfortos, privát kis lakóegységek tökéletesek a pihenéshez és feltöltődéshez. Ha szeretnél elvonulni a zajtól, de mégis közel szeretnél lenni a fesztivál eseményeihez, a mobilházak ideális választás!',
    entrance:
      'A fesztivál bejárata az első lépés a felejthetetlen élmények felé. Itt kezdődik az utazás, amikor belépsz a fesztivál világába. Az entrance nemcsak egy egyszerű belépési pont, hanem a fesztivál hangulatának és izgalmának az előhírnöke. A belépés pillanata minden látogatónak egy különleges élményt nyújt, hiszen itt kezdődnek az igazi kalandok!',
  };

  showDescription(areaId: string): void {
    this.selectedDescription = areaId;
  }
}
