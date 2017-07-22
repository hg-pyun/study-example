# Functional Programming in Javascript

 이번 포스팅에서는 자바스크립트에서 함수형 프로그래밍(Functional Programming) 하는 방법을 정리해 보고자한다. 함수형 패러다임 개념이 생소한 사람은 다음 포스팅을 읽어보도록 하자. (번역) 함수형 프로그래밍이란 무엇인가?

 위 포스팅에서 말하고자 하는 핵심은 다음과 같다.

```
함수형 프로그래밍은 순수 함수를 작성하는 것, 그러니까 숨겨진 입력이나 출력을 최대한 제거하여 가능한한 우리 코드의 대부분이 단지 입력과 출력의 관계를 기술하게끔 하는 것을 말한다.

부작용을 완전히 피할 수는 없다. 대부분의 프로그램은 반환 값을 얻기 위해서가 아니라 어떤 동작을 하기 위해 실행하기 때문이다. 하지만 프로그램 내부에서는 엄격하게 통제하고자 한다. 우리는 가능한 모든 곳에서 부작용(과 부원인)을 제거하고, 또 제거할 수 없는 경우에는 철저하게 통제할 것이다. 

다르게 말하자면, 코드 조각이 필요로 하는 것과 유발하게 될 결과를 숨기지 말자. 코드 조각이 제대로 실행하기 위해 뭔가를 필요로 한다면 그렇게 말하자. 뭔가 유용한 일을 한다면 출력 형태로 선언하자. 이렇게 한다면 우리의 코드는 더 명확해 질 것이다. 복잡성이 표면에 드러나고 우리는 그것을 분해하여 처리할 수 있을 것이다.
```

  자바스크립트는 정확히 말하면 함수형 언어가 아니다. 하지만 함수형 언어에서 사용하는 개념과 문법, 인터페이스를 지원한다. 대표적으로 1급 객체인 함수(First Class Function)와 클로저(Closure)등이 있는데, 여기서는 유용한 몇가지 함수형 프로그래밍 기법을 소개하고자 한다.

## Native

  사실 자바스크립트에서 함수형 프로그래밍을 지원하기 위한 라이브러리가 몇가지 존재한다. undersocre, lodash가 대표적이며, 최근에 나온 Ramda라는 라이브러리도 있다. 하지만 ECMAScript 5에서도 이미 함수형 패러다임을 지원하기 위한 문법이 추가되었는데 대표적인 것들이 바로 map, filter, reduce 등이 있다. 우선 ES5에서 지원하는 함수형 패러다임에 대해 알아보도록 하자.

#### Map

 먼저 map에 대해 알아보자. Array.prototye.map은 배열 내의 모든 요소 각각에 대하여 제공된 함수(callback)를 호출하고, 그 결과를 모아서, 새로운 배열을 반환한다. 배열의 요소들에 특정한 처리를 할때 주로 사용한다. 예를 들어보도록 하자. 단어들의 집합이 있고, 내가 하고 싶은 것은 이 단어들을 대문자로 바꾸고 싶다. 

Native-map.js
```javascript
// 과목을 저장
let subjects = ['math', 'english', 'korean'];

// 대문자로 변경
function makeUpperCase(word) { 
    return word.toUpperCase();
}
 주어진 변수와 함수를 사용해서 subjects안의 단어들을 바꾸는 방법은 무궁무진하지만 보통 이런 방법을 사용할 것이다.
// loop
let loopResult = [];
for (let i = 0; i < subjects.length; i++) {
    loopResult.push(makeUpperCase(subjects[i]));
}
console.log(loopResult);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]
```
 이번엔 함수형 패러다임으로 작성해 보도록 하자.
```javascript
// functional
let funcResult = subjects.map(makeUpperCase);   // Array.prototype.map.call(subjects, makeUpperCase);
console.log(funcResult);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]
``` 
 어떤가. 반복문을 사용하는 것보다 코드량도 줄고 명확해졌다. 물론 성능면에서는 for를 사용하는것이 훨씬 좋을 것이다. 그러나 오늘날 프로그래밍을 하는데 있어서 성능도 중요하지만 가독성과 유지보수에 대한 내용도 함께 고민해야한다. 앞에서 언급한 함수형 패러다임에서의 장점이 부작용을 최소화 하는것에 중점을 두는것을 다시 한번 기억하도록 하자. 

 이번엔 구체적인 사례를 한번 들어보도록 하자. 

React에서 list를 그려줄 때 map을 많이 사용한다. Lists and Keys를 보면 map을 이용해서 li tag에 데이터를 바인딩 한다.
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li>{number}</li>
);
```
 이를 응용하면 React에서 컴포넌트를 재사용할 때 매우 유용하다. Velopert님의 포스팅을 참고해 보도록 하자. [React.js] 강좌 6-1편 컴포넌트 Iteration (반복) – Map. 반복되는 부분의 컴포넌트를 랜더링 할때 map을 이용해서 컴포넌트와 데이터를 매우 깔끔하게 연결하고 있다.
```javascript
{this.state.contactData.map((contact, i) => {
    return (<ContactInfo name={contact.name}
    phone={contact.phone}
    key={i}
        />);
})}
```
#### Filter

 다음으로 filter이다. Array.prototype.filter는 파라미터로 넘겨진 함수의 테스트를 통과하는 모든 요소가 있는 새로운 배열을 반환한다. 이번에도 예를 들어보도록 하자. 이번엔 (과목, 점수) Set들의 집합에서 90점 이상의 과목들만 추출해 보고자 한다.

Native-filter.js
```javascript
// 과목 이름, 점수 데이터
let subjects =
    [{
        name: 'math',
        score: 100,
    }, {
        name: 'english',
        score: 85
    }, {
        name: 'korean',
        score: 95
    }];

// 90점 이상인지 체크
function is90Over(subject) {
    return subject.score > 90;
}
 map과 마찬가지로 반복문을 이용한 방법을 먼저 소개한다.

// loop
let result = [];
for (let i = 0; i < subjects.length; i++) {
    let subject = subjects[i];
    if(is90Over(subject)){
        result.push(subjects[i]);
    }
}
console.log(result); // [ { name: 'math', score: 100 }, { name: 'korean', score: 95 } ]
```
 자 이번엔 filter를 사용해 보도록 하자.
```javascript
// filter
let funcResult = subjects.filter(is90Over);
console.log(funcResult); // [ { name: 'math', score: 100 }, { name: 'korean', score: 95 } ]
```
 map과 비슷하다. 앞에서 설명한 내용과 같으므로 바로 어떻게 응용할 수 있는지 소개하도록 하겠다. 이번에도 React를 예를 들어보도록 하자. filter는 주로 React에서 list를 그릴 데이터를 정제하는데 사용한다. 앞서 list를 랜더링 하는 부분에 filter를 응용해보도록 하자. 아래 리스트는 4 이상의 number로만 구성된 list를 랜더링한다.
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.filter(number => number > 3).map((number) =>
    <li>{number}</li>
);
```

 마찬가지로 filter를 이용하면 특정 키워드를 입력받아서 해당 키워드에만 해당하는 데이터 집합을 추출할 수 있는데, 이를 응용하면 검색(Search) 기능도 쉽게 구현할 수 있다.

#### Reduce

 마지막으로 소개할 method는 reduce이다. Array.prototype.reduce는 누산기(accumulator) 및 배열의 각 값(좌에서 우로)에 대해 (누산된) 한 값으로 줄도록 함수를 적용한다. 이번엔 subjects에서 과목들의 모든 글자수의 합을 얻고 싶다.

native-reduce.js
```javascript
// 과목을 저장
let subjects = ['math', 'english', 'korean'];

// 이전 숫자에 단어 숫자를 카운트해서 저장
function addLength(total, word) {
    return total + word.length;
}
 먼저 반복문을 이용한 방법이다. loopTotal에 addLength 함수를 사용하여 이전 단어 글자수를 카운트한 다음 더한다.

// loop
let loopTotal = 0;
for (let i = 0; i < subjects.length; i++) {
    let subject = subjects[i];
    loopTotal = addLength(loopTotal, subject);
}
console.log(loopTotal); // 17

```
 다음으로 reduce를 이용한 방법을 소개한다. map, filter와 마찬가지로 깔끔하다.
```javascript
// functional
let funcTotal = subjects.reduce(addLength, 0);
console.log(funcTotal);  // 17
```
 reduce 함수를 이용하면 map, filter 함수를 구현할 수 있다. 대부분의 고차 함수들은 reduce로 구현을 할 수 있는데, 자세한 내용은 Javascript Reduce 함수 포스팅을 참고하도록 하자. reduce에 대한 흥미로운 사실들을 확인할 수 있다.



## Arrow

 다음으로 ECMA2015에 추가된 arrow에 대해 간단히 소개해 보고자 한다. 몇 가지 arrow function에 대한 부가적인 특성이 더 있는데 여기서는 함수형 패러다임에 관한 이야기만 다루도록 하겠다. arrow는 다음과 같이 사용한다.

arrow.js
```javascript
let subjects = ["math", "english", "korean",];

let lengthArray = subjects.map(function(s){ return s.length });
let lengthArray2 = subjects.map( s => s.length );

console.log(lengthArray);  // [ 4, 7, 6 ]
console.log(lengthArray2); // [ 4, 7, 6 ]
```
map, filter, reduce같이 앞에서 언급했던 method와 같이 사용하면 매우 간결하게 데이터 조작이 가능하다. 또 arrow를 사용하면 currying 함수를 매우 쉽게 작성할 수 있다.

currying.js
```javascript
let sum = x => y => x+y;
let sum5 = sum(5);
let sum12 = sum5(7);

console.log(sum12, sum(5)(7)); // 12 12
```
 currying은 Haskell에서 나온 기법중 하나이다. 간단히 이야기하자면 여러개의 인자를 받은 함수를 쪼개 하나의 인자를 받은 함수들로 연결하는것을 의미한다. 이에 관련된 내용은 다른 포스팅에서 좀 더 자세히 다루도록 하겠다. 오늘은 이 정도만 알고 넘어가도록 하자. arrow function의 등장은 1급 객체 함수, 익명 함수, 클로저에 이은 흐름에 따라 필연적으로 추가될 수 밖에 없었을 것이라 생각한다. 이에 관련된 잘 정리한 포스팅 하나를 소개하고자 한다. 람다, 익명함수, 클로저 

## 마치며

 최근 다양한 프로그래밍 패러다임을 공부하면서 그 중 특히 함수형 프로그래밍에 대해 큰 매력을 느끼고 있다. 수학적 이론을 바탕으로 적절히 사용하면 부작용이 적고 재사용성이 높은 코드를 작성하는데 큰 도움을 줄 수 있을 것이라 생각한다. 또 마침 주로 사용하는 자바스크립트가 함수형 패러다임을 받아들이고 있으므로 이를 공부해두면 앞으로 좀 더 효율적인 코드를 작성 할 수 있을 것이다. 다음 포스팅에서는 immutable, recursive 등 함수형 패러다임의 특징과 좀 더 구체적인 사용법, 그리고 실제로는 어떻게 사용하는지에 대해 다루어 보도록 하자.
