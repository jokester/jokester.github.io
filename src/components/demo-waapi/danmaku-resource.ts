import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const terms = `
反也者 道之動也 弱也者 道之用也 天下之物生於有 有生於无 爲學者日益 聞道者日損 損之又損 以至於无爲 无爲而无不爲
將欲取天下者恆无事 及其有事也 不足以取天下 信言不美 美言不信 知者不博 博者不知 善者不多 多者不善 聖人无積 既以爲人己愈有 既以予人己愈多
故天之道 利而不害 人之道 爲而弗爭 知不知 尚矣 不知不知 病矣 是以聖人之不病 以其病病也 是以不病 道 可道也 非恆道也 名 可名也 非恆名也
無名 萬物之始也 有名 萬物之母也 故恆无欲也 以觀其眇 恆有欲也以觀其所噭 兩者同出 異名同謂 玄之有玄 眾眇之門 戴營抱一 能毋離乎 摶氣至柔 能嬰兒乎
脩除玄藍 能毋疵乎 愛民栝國 能毋以知乎 天門啓闔 能爲雌乎 明白四達 能毋以知乎 生之 畜之 生而弗有 長而弗宰也 是謂玄德 知其雄 守其雌 爲天下谿
爲天下谿 恆德不離 恆德不離 復歸嬰兒 知其榮 守其辱 爲天下浴 爲天下浴 恆德乃足 德乃足 復歸於樸 知其白 守其黑 爲天下式 爲天下式 恆德不忒 恆德不忒 復歸於无極
樸散則爲器 聖人用則爲官長 夫大制无割
`
  .split(/\s/)
  .map((_) => _.trim())
  .filter((_) => _);

export function createTermsObservable(_interval: number): Observable<string> {
  return interval(_interval).pipe(map((count) => terms[count % terms.length]));
}

interface DanmakuItem {
  content: string;
  start(container: HTMLElement, content: string): () => void;
}
