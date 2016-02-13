<?php

spl_autoload_register(function ($className) {
    require_once __DIR__ . '/classes/' . $className . '.php';
});

require_once 'Score.php';

class Data
{
    const FilePath = 'Database/data.txt';

    const RowSeparator = ',';

    const InfoSeparator = '|';

    /**
     * Checks if new high score. If so rewrites high scores data.
     * @param $score
     */
    static function AddData($score)
    {
        $highScores = self::GetData();

        $newHighScores = self::IsHighScore($highScores, $score);

        $encodeHighScores = self::EncodeData($newHighScores);

        if($highScores != $newHighScores){
            $file = fopen(self::FilePath, "w");
            fwrite($file, $encodeHighScores);
            fclose($file);
        }
    }

    /**
     * Gets high scores from file.
     * @return array
     */
    static function GetData()
    {
        $file = fopen(self::FilePath, "r");
        $result = fread($file, filesize(self::FilePath));
        fclose($file);

        return self::DecodeData($result);
    }


    /**
     * Encodes high scores array into string.
     * @param $scores
     * @return string
     */
    private static function EncodeData($scores)
    {
        $result = "";
        foreach ($scores as $key => $value) {
            $rowValues = implode(self::InfoSeparator, $value);
            $result .= $rowValues;
            if ($key !== 9) {
                $result .= ',';
            }
        }
        return $result;
    }

    /**
     * Decodes string into array.
     * @param $data
     * @return array
     */
    private static function DecodeData($data)
    {
        $rowsToEncode = explode(self::RowSeparator, $data);
        $rows = [];
        foreach ($rowsToEncode as $key => $value) {

            $rowValues = explode(self::InfoSeparator, $value);

            array_push($rows, [
                "name" => $rowValues[0],
                "score" => $rowValues[1]
            ]);
        }
        return $rows;
    }

    /**
     * Checks if given score is a new high score.
     * @param $highScores
     * @param $score
     * @return array
     */
    private static function IsHighScore($highScores, $score)
    {
         $newArray = [];
         for ($i = 0; $i < 10; $i++) {
             if (intval($score["score"]) > intval($highScores[$i]["score"])) {
                 array_push($newArray, $score);
                 $highScores = array_slice($highScores, $i, 10 - $i - 1);
                 $newArray = array_merge($newArray, $highScores);
                 break;
             } else {
                 array_push($newArray, $highScores[$i]);
             }
         }

        return $newArray;
    }
}