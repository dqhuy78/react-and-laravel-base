<?php

namespace App\Http\Resources;

use App\Http\Resources\Custom\ShareResource;

class UserResource extends ShareResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) // @codingStandardsIgnoreLine
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
        ];
    }
}
