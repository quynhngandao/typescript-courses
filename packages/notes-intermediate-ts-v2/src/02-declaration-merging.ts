//* Declaration merging

//? Type
interface Fruit {
  //      ^?
  name: string
  mass: number
  color: string
}

const banana: Fruit = {
  //    ^? identifier
  name: 'banana',
  color: 'yellow',
  mass: 183,
}


// //? Value
function Fruit(kind: string) {
  switch (kind) {
    case 'banana':
      return banana
    default:
      throw new Error(`fruit type ${kind} not supported`)
  }
}


//? Namespace
namespace Fruit {
  //         ^?
  function createBanana(): Fruit {
    //                          ^?
    return Fruit('banana')
    //           ^?
  }
}

//* How to tell what's on an indentifier

const is_a_value = 4
type is_a_type = {}
namespace is_a_namespace {
  const foo = 17
}

// how to test for a (value | namespace)
const x = is_a_value // the value position (RHS of =).
//           ^?

// how to test for a type
const z: is_a_type = {} // the type position (LHS of =).
//         ^?
// const z: is_a_type = {} as any 
//            ^?
// how to test for a namespace (hover over is_a_namespace symbol)
is_a_namespace


const x_2 = is_a_type //! Wrong position for type
const x_3 = is_a_namespace //✔️ Namespace can be used as a value
// how to test for a type
const y: is_a_value = {} //! Wrong position for value
const yy: is_a_namespace = {} // ✔️ Namespace can't be used as a type

//* What's the point of `namespace`?

// a `fetch` kind of function
// @ts-ignore
$.ajax({
  url: '/api/getWeather',
  data: {
    zipcode: 97201,
  },
  success: function (result) {
    // @ts-ignore
    $('#weather-temp')[0].innerHTML =
      '<strong>' + result + '</strong> degrees'
  },
})
// a `document.querySelectorAll` kind of function
// @ts-ignore
$('h1.title').forEach((node) => {
  node.tagName // "h1"
  //    ^?
})
// NOTE: jQuery: useful for DOM query API early days 

// EXAMPLE use case of function
function $(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector)
}
namespace $ {
  export function ajax(arg: {
    url: string
    data: any
    success: (response: any) => void
  }): Promise<any> {
    return Promise.resolve()
  }
}

//* A look back on classes

class Fruit2 {
  name?:string 
  mass?: number
  color?: string 
  static createBanana() {
    return {name: 'banana', color: 'yellow', mass: 183}
  }
}

// class Fruit2 {
//   name?:string 
//   mass?: number
//   color?: string 
//   static createBanana() : Fruit2 {
//     return {name: 'banana', color: 'yellow', mass: 183} as const 
//   }
// }

//* Readonly at run time by using Object.freeze 
// class Fruit2 {
//   name?:string 
//   mass?: number
//   color?: string 
//   static createBanana() : Fruit2 {
//     return Object.freeze ({name: 'banana', color: 'yellow', mass: 183})
//   }
// }

// how to test for a value
const valueTest = Fruit2 // Fruit2 is a value!
valueTest.createBanana

// how to test for a type
let typeTest: Fruit2 = {} // Fruit2 is a type!
typeTest.color

/**/
export { banana, Fruit, Fruit2 }
// note: Interface -> namespace // namespace -> value  
// Fruit2 -> declaration merging 