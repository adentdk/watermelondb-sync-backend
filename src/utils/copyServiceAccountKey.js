import * as shell from 'shelljs'

shell.cp('-R', './src/config/serviceAccountKey.json', './dist-babel/config/serviceAccountKey.json')