# jsfuscate
Jsfuscate is a tool to create obfuscated javascript code.

## Compiling a script
You can simply compile a script by using
```sh
$ yarn start <input file> <output dir>
```

## Live compilation (console)
Jsfuscate has a built in console for live compiling strings and javascript code. To start the console, simply use
```sh
$ yarn start
```

## Compiling scripts with dependency trees
As of right now, it is not possible to compile scripts with dependency trees.


It is implemented but sadly does not work because of javascript limitations.  
You can try to compile a dependency tree by simply compiling a script which depends on other scripts.  
The problem is that when you run the compiled script you will be presented with one of the following errors: 
- `SyntaxError: Cannot use import statement outside a module`
- `ReferenceError: require is not defined`

We currently not know of any fix. Though there is a possible light in the dark: [ShadowRealms](https://github.com/tc39/proposal-shadowrealm).