<?php
$file = 'comments.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'] ?? '';
  $comment = $_POST['comment'] ?? '';

  $newComment = ['name' => $name, 'comment' => $comment];
  $comments = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
  $comments[] = $newComment;

  file_put_contents($file, json_encode($comments));
  echo json_encode(['success' => true]);
  exit;
} else {
  // Return comments
  header('Content-Type: application/json');
  echo file_get_contents($file);
}
