# ES6 Proxy
http://dev-momo.tistory.com/entry/javascript-ES6-Proxy

여기저기서 자바스크립트의 새로운 표준인 ECMA2015(ES6) 문법이 많이 쓰이고 있다. arrow, spread부터 class까지 정말 다양한 스펙들이 추가되었다. 그 중에서 아무리 봐도 잘 이해가 안가는 객체가 있었으니 바로 Proxy이다. 구글링을 해봐도 명쾌하게 이해되는 글은 찾아볼 수가 없었다. 이번 기회에 proxy가 뭔지 파헤쳐 보도록 하자.

## Proxy ?
 먼저 Proxy란 단어의 사전적 의미부터 알아보자. 네이버 사전에서 Proxy를 검색해 보았다.
```
Proxy란 대리, 대리인, (측정・계산하려는 다른 것을 대표하도록 이용하는) 대용물.
```
쉽게말해 뭔가를 대리해주는 객체를 의미한다. 사실 Proxy란 용어는 Server-Side에서 많이 사용되는 용어이다. front-proxy, reverse-proxy 서버 등 중간에서 무언가의 역할을 대리해주는 서버들을 가리킨다. 그렇다면 javascript es6의 proxy는 도대체 뭘 대리하는 것일까. MDN Proxy 문서를 한번 찾아 보았다.
```
The Proxy object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).
```
정리해보면 Proxy객체는 자바스크립트에서의 기본 작업, 예를들면 속성 조회, 할당, 열거, 함수 호출등에 대한 행위에 대해 사용자의 커스텀 동작을 정의할 때 사용할 수 있다는 것이다. 오 듣고보니 기본 작업을 오버라이딩 하는 느낌이 든다. 실제로 한번 사용해 보도록 하자. Proxy 객체는 다음과 같이 사용한다.
```
var p = new Proxy(target, handler);
```
target 에는 Proxy로 랩핑할 대상 객체를 지정해 줄 수 있다. 기본 배열, 함수, 또다른 Proxy객체 등이 들어올 수 있다.
handler에는 operation이 수행 될 때, Proxy의 동작을 정의하는 함수 객체를 넣어준다. 여기서 말하는 operation이란 앞에서 언급했던 속성 조회, 할당, 열거, 함수 호출 등이 있겠다. handler에는 get, set, has, defineProperty, deleteProperty, construct, apply 등 총 13가지 함수를 핸들링 할 수 있다. 먼저 가장 간단한 get 부터 사용해보도록 하자.

#### handler.get.js
```
var p = new Proxy({}, {
    get: function(target, prop, receiver) {
        console.log('called: ' + prop);
        return 10;
    }
});

console.log(p.a); // "called: a"
                  // 10
```
위 코드를 nodejs나 chrome으로 실행시켜 보면 "called: a"가 출력된 후 "10"이 출력되는 것을 볼 수 있다. handler의 get method는 바로 '.' 연산을 hook하는 역할을 한다. 앞에서 언급한 속성 조회('.' 연산자 사용)시 사용자의 커스텀 동작(return 10;)을 실행한 것이다. 막상 써보니 무진장 신기하다. 이번엔 set을 한번 사용해보도록 하자.

#### handler.set.js
```
var p = new Proxy({}, {
    set: function(target, prop, value, receiver) {
        console.log('called: ' + prop + ' = ' + value);
        return true;
    }
});

p.a = 10; // "called: a = 10"
```
set method는 '=' 연산자가 실행될 때 hook이 실행된다. 말그대로 뭔가 값을 할당(set)할 때 커스텀 동작을 실행시킨다.

하나만 더 해보도록 하자. construct method는 뭘 hook하는 것일까. construct 즉 생성자인것을 보니 new 연산자를 사용했을 때라 짐작 할 수 있다.

#### handler.construct.js
```
var p = new Proxy(function() {}, {
    construct: function(target, argumentsList, newTarget) {
        console.log('called: ' + argumentsList.join(', '));
        return { value: argumentsList[0] * 10 };
    }
});

console.log(new p(1, 2, 3).value); // "called: 1, 2, 3"
                                   // 10
```
예상대로 new 연산자가 실행 될 때 hook하는 것을 볼 수 있다. 두번째 인자로 new 연산자의 arguments들이 넘어오고 json 형태로 리턴값으로 전달도 할 수 있다.이밖에도 apply를 사용하면 함수 호출을, defineProperty를 사용하면 객체를 할당할 때, deleteProperty를 사용하면 객체를 delete할 때 hook을 할 수 있다.

## 어디다 쓰면 될까?
 Proxy에 대해 알아보긴 했는데, 도대체 어디다 사용하면 되는지 감이 잘 잡히지 않는다. 실제 사용되는 사례를 찾아본 바로는 객체 로깅(Object Logging)이나 읽기 전용 객체(Read Only Object) 등이 있다. 객체 로깅은 말그대로 핸들러 내부에 로그를 삽입해서 객체를 관찰하는 것을 말한다. 테스트 프레임워크 등에서 이를 응용해서 사용하면 좀 더 정확한 테스팅이 가능할 것이다. 읽기 전용 객체는 타겟을 변경할 수 있는 handler method들을 모두 오버라이딩 하는것이다. 이렇게 하면 해당 객체에 변경을 가하는 행위('='이라던가 define이라던가)를 해도 handler에서 모두 가로채여 막아지므로 읽기만 가능한 객체를 만들 수 있다. 관심이 있는 사람은 ES6 In Depth 포스팅을 참고하도록 하자.

## 마치며
ES6 Proxy에 알아보았는데, 사실 디자인 패턴중 하나인 proxy패턴을 Native로 구현해 놓은 것이라 생각하면 이해가 쉬울 것이다. 또 Proxy와 함께 많이 쓰이는 Reflect API가 있는데 이것에 대해선 다른 포스팅에서 다뤄보도록 하겠다


출처: http://dev-momo.tistory.com/entry/javascript-ES6-Proxy [Programming Note]