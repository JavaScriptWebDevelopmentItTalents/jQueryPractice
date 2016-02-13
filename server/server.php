<?php
header('Content-Type: application/json');

require_once 'Score.php';
require_once 'Data.php';

$post = file_get_contents('php://input');

if($post) {
    $post = json_decode($post);
	$score = new Score($post->name, $post->score);
    Data::AddData($score->getRow());
} else {
    echo json_encode(Data::GetData());
}