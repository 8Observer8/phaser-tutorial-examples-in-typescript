
import { Game } from "./Game";

export class Program
{
    public static Main()
    {
        new Game();
    }
}

window.onload = () =>
{
    Program.Main();
};
