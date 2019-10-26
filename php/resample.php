<?php

define('ROOT', dirname(__DIR__));

foreach ($argv as $k=>$p) {
  echo "$k=>$p\n";
}
$sppath = $argv[$argc-1];
$path = ROOT.'/'.$sppath;

echo "__FILE__:".__FILE__."\n";
echo "__DIR__:".__DIR__."\n";
echo "ROOT:".ROOT."\n";
echo "sprites:$path\n";

$files = glob("$path/*/*.png");
var_dump($files);
