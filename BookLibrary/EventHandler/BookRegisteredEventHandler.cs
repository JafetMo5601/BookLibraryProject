using System;
namespace BookLibrary.EventHandler;

public interface IEventHandler<TEvent>
{
    Task HandleEventAsync(TEvent @event);
}

public class BookRegisteredEventHandler : IEventHandler<BookRegisteredEvent>
{
    public async Task HandleEventAsync(BookRegisteredEvent @event)
    {
        Console.WriteLine($"Book named '{ @event.Title }' created for the category '{ @event.Category }'!");
    }
}


