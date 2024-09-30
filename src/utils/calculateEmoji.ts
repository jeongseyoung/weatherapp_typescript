export function calEmoji(list: any) {
  let z = 6;
  const tempForecast: any[][] = [];

  for (let i = 0; i <= 3; i++) {
    let t: number[] = [];
    let emojiId: number[] = [];
    const day = list[z].dt_txt.slice(8, 10) + "일";

    for (let j = 1; j <= 8; j++) {
      t.push(list[z].main.temp);
      emojiId.push(list[z].weather[0].id);
      z++;
    }
    const a = emojiId.reduce(function sum(i, j) {
      return i + j;
    }, 0);
    const averageEmojiId = Math.floor(a / emojiId.length);
    //console.log(emojiId, averageEmojiId);
    tempForecast.push([
      day,
      Math.floor(Math.min(...t)),
      Math.floor(Math.max(...t)),
      list[z].weather[0].main,
      averageEmojiId,
    ]);
  }
  return tempForecast;
}
