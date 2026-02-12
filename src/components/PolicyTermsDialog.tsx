import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { ScrollArea } from "@/components/ui/scroll-area";
  
  const PolicyTermsDialog = () => {
    const policies = [
      "Rates apply per person and the meeting points within a 10 km radius from the center of La Fortuna de San Carlos.",
      "All tours and transportation are operated with a minimum of 2 people. If a single client wishes to take the tour, he must pay for 2 people.",
      "A tour is officially confirmed once the payment transaction is completed via the payment link or cash, confirming the clients' genuine intention to attend the activity.",
      "The reservation must specify the full name of the client, the activity to be carried out, the client's age, the meeting place where the clients will be picked up, and the pickup time.",
      "Cancellations must be made 24 hours before the activity; otherwise, a penalty of 100% of the tour value will be applied.",
      "Bajos del Toro cannot be operated on Sundays.",
      "Clients who purchase private tours can set pick up times according to their convenience.",
      "The maximum waiting time after the pick up time previously established with the client is 15 minutes on regular tours and 30 minutes on private tours.",
      "Transportation services from La Fortuna to Tortuguero and Corcovado includes water transportation services.",
      "Children from 0 to 3 years old do not pay.",
      "Rates with IVA taxes included.",
    ];
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
          >
            Terms & Policies
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">
              General Policies
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <ol className="space-y-4 list-decimal list-inside text-sm text-muted-foreground font-body">
              {policies.map((policy, index) => (
                <li key={index} className="leading-relaxed">
                  {policy}
                </li>
              ))}
            </ol>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default PolicyTermsDialog;