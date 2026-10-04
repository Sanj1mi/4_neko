import { parseLrc } from '../../../shared/lib'
import lrc1 from '../lyrics/1.lrc?raw'
import lrc2 from '../lyrics/2.lrc?raw'
import lrc3 from '../lyrics/3.lrc?raw'

export const TRACKS = [
  {
    id: 't1',
    title: 'Hearts Burst into Fire',
    artist: 'Bullet For My Valentine',
    src: '/audio/1.mp3',
    message: 'Ты - олицетворение проигрыша из данного трека \n точно также заставляешь мое сердце \n гореть (><)',
    lyrics: parseLrc(lrc1),
  },
  {
    id: 't2',
    title: 'Cupsize',
    artist: 'Вайфуу',
    src: '/audio/2.mp3',
    message: 'Кто бы что там про тебя не говрил \n для меня ты и есть та самая вайфуу \n давай закроемся от всех и прыгай в мою шаху',
    lyrics: parseLrc(lrc2),
  },
  {
    id: 't3',
    title: 'When the Sun Sleeps',
    artist: 'Underoath',
    src: '/audio/3.mp3',
    message: 'Close my eyes just for tonight...',
    lyrics: parseLrc(lrc3),
  },
]
