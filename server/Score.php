<?php

/**
 * Class Score
 */
class Score
{
    private $name;

    private $score;

    /**
     * Row constructor.
     * @param $name
     * @param $score
     */
    public function __construct($name, $score)
    {
        $this->name = $name;
        $this->score = $score;
    }

    /**
     * @return array
     */
    public function getRow()
    {
        return [
            "name" => $this->name,
            "score" => $this->score
        ];
    }
}