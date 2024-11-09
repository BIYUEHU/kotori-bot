let inject = ["browser"]

@val external setTimeout: (unit => unit, int) => float = "setTimeout"

// 意外的错误！
// 捕获信息：KotoriError
//  TODO: black query and here config

type config = {
  times: int,
  duration: int,
  steps: int,
  minNum: int,
  maxNum: int,
}

let main = (ctx: Kotori.context, config: config) => {
  open Kotori.Msg

  let config = {
    times: 7,
    duration: 120,
    steps: 3,
    minNum: 1,
    maxNum: 10,
  }

  ctx.loadExport({
    main: ctx2 => {
      let identity = switch ctx2.identity {
      | Some(identity) => identity
      | None => "Unknown"
      }
      Console.log(`Hello, world! from ${identity}`)
    },
  })

  "greet - get a greeting"
  ->ctx.cmd_new
  ->ctx.cmd_action(async (_, session) => {
    let res = await "http://hotaru.icu/api/hitokoto/v2?format=text"->ctx.http.get
    <Text>
      {switch res->Type.typeof {
      | #string => session.format("Greet: \n{0}", [res->Kotori.Utils.toAny])
      | _ => "Sorry, I cannot get a greeting right now."
      }}
    </Text>
  })
  ->ctx.cmd_help("Get a greeting from hotaru.icu")
  ->ctx.cmd_scope(#all)
  ->ctx.cmd_alias(["hi", "hey", "hello"])
  ->ignore

  "res [saying=functional]"
  ->ctx.cmd_new
  ->ctx.cmd_action(async ({args}, session) => {
    let userId = switch session.userId {
    | Some(userId) => userId
    | None => "Unknown"
    }
    <Seg>
      <Text> {"Hello "} </Text>
      <Mention userId />
      <Br />
      <Text>
        {switch args {
        | [String(saying)] => session.format("Greet: \n{0}", [saying])
        | _ => "Sorry, I cannot get a greeting right now."
        }}
      </Text>
      <Seg>
        <Text> {"he is a example image"} </Text>
        <Image src="https://i.imgur.com/y5y5y5.png" />
      </Seg>
    </Seg>
  })
  ->ignore

  #on_group_increase->ctx.on(async session => {
    // 使用之前定义的表达式生成器
    let (expr, result) = Expr.generateAndCalculate(config.steps, config.minNum, config.maxNum)
    // 设置超时踢出
    let kick = () =>
      switch (session.groupId, session.userId) {
      | (Some(groupId), Some(userId)) => session.api.setGroupKick(groupId, userId)->ignore
      | _ => ()
      }

    let timerId = Js.Global.setTimeout(() => {
      session.quick(
        <Text> {`回答超时，答案是${result->Belt.Int.toString}。`} </Text>,
      )->ignore
      kick()
    }, config.duration * 1000)
    let start = Js.Date.now()

    let rec checker = async (count: int) => {
      if count >= config.times {
        session.quick(
          <Text> {`回答次数达到上限，答案是${result->Belt.Int.toString}。`} </Text>,
        )->ignore
        kick()
      } else if Js.Date.now() -. start >= config.duration->Belt.Float.fromInt *. 1000.0 {
        ()
      } else {
        let answer = await session.prompt(
          <Seg>
            <Text>
              {`剩余时间 ${(config.duration -
                (Js.Date.now()->Belt.Int.fromFloat / 1000 -
                start->Belt.Int.fromFloat / 1000))
                  ->Belt.Int.toString} 秒，剩余次数 ${(config.times - count)
                  ->Belt.Int.toString} 次。`}
            </Text>
            <Br />
            <Text> {`请输入答案：`} </Text>
          </Seg>,
        )
        switch answer->Belt.Int.fromString {
        | Some(num) if num === result => {
            await session.quick(<Text> {`回答正确，危机解除！`} </Text>)
            Js.Global.clearTimeout(timerId)
          }
        | _ => await checker(count + 1)
        }
      }
    }

    await session.quick(
      <Seg>
        <Mention
          userId={switch session.userId {
          | Some(userId) => userId
          | None => "Unknown"
          }}
        />
        <Text>
          {` 请在 ${config.duration->Belt.Int.toString} 秒内发送以下数学表达式的结果，共有 ${config.times->Belt.Int.toString} 次机会：`}
        </Text>
        <Br />
        <Text> {expr} </Text>
        <Br />
        <Text> {"1.回答超时或错误次数达到上限时，将自动踢出群组。"} </Text>
        <Br />
        <Text>
          {"2.若结果为小数，请直接舍弃小数部分发送整数（如：π -> 3）。"}
        </Text>
      </Seg>,
    )
    await checker(0)
  })
}