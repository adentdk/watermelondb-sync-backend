import * as shell from 'shelljs'

shell.cp('-R', './src/config/commit_sha', './dist-babel/config/commit_sha')
shell.cp('-R', './src/config/serviceAccountKey.json', './dist-babel/config/serviceAccountKey.json')