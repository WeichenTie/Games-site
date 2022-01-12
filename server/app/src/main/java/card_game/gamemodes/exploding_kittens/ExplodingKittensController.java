package card_game.gamemodes.exploding_kittens;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/explodingkittens")
public class ExplodingKittensController {
    @PostMapping(value = "/lobby/create")
    public void createLobby(){
    }

    @PostMapping(value = "/lobby/delete")
    @ResponseBody
    public void deleteLobby(@RequestBody String id) {
        System.out.println(id);
    }
/*
    @PostMapping()
    public void addPlayer(){
    }

    @PostMapping()
    public void removePlayer(){
    }

    @PostMapping()
    public void sendMessage(){
    }

    @PostMapping()
    public void drawCard(){
    }

    @PostMapping()
    public void playCard(){
    }*/
}
