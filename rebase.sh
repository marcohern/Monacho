git stash -u
git checkout master
git pull
git checkout $1
git rebase master
git stash pop
