<?php

     $target_dir = "./../upload/";
     $name = $_POST['name'];
     print_r($_FILES);
     $target_file = $target_dir . $name. "_full.jpg";

     move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);


     $images = $target_file;
     $new_images = $target_dir . $name. "_thumb.jpg";
     $width=300; //*** Fix Width & Heigh (Autu caculate) ***//
     $size=GetimageSize($images);
     $height=round($width*$size[1]/$size[0]);
     $images_orig = ImageCreateFromJPEG($images);
     $photoX = ImagesX($images_orig);
     $photoY = ImagesY($images_orig);
     $images_fin = ImageCreateTrueColor($width, $height);
     ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $width+1, $height+1, $photoX, $photoY);
     ImageJPEG($images_fin,$new_images);
     ImageDestroy($images_orig);
     ImageDestroy($images_fin);

       $arr = array('d' => 4, 'e' => 5);
    echo json_encode($arr); // new file uploaded


?>
