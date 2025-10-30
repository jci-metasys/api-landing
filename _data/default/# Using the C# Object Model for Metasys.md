# Using the C# Object Model for Metasys

Object interface

```csharp
var av = repo.GetObject(id, View.Focus); // Focus is default view for av anyway, shown to be explicit

var presentValue = av.PresentValue;   // Would be nice if the property getter returned the raw value, but then how to get the metadata about PresentValue? Also, this would require reflection.

var presentValue = av.Attributes["PresentValue"]; //Again would be nice if this returned the raw value, but  it probably has to return the "AttributeObject".

// Perhaps we have a AttributeValues collection that returns exactly the raw values
var presentValue = av.AttributeValues["PresentValue"]

// Would be nice to not use strings.
var presentValue = av.AttributeValues[Attribute.PresentValue]

// So in this current thinking Attributes would be a collection of objects which represent the
// values and their metadata. Whereas AttributeValues would return a collection of raw values.

// For example

var presentValueAttribute = av.Attributes[Attribute.PresentValue];
var presentValueUnit = presentValueAttribute.DisplayData[DisplayData.Unit];
var presentValueCurrentValue = presentValueAttribute.Value; // But what is data type of Value???

// or this would return the same thing as previous line

var presentValueCurrentValue = av.AttributeValues[Attribute.PresentValue];

// To get strong typing instead of returning a variant we could explore other variant models

var presentValueCurrentValue = av.AttributeValues.GetValue<MetasysFloat>(Attribute.PresentValue); // this would throw invalid cast exception of the value wasn't actually a float. But we either need to document a mapping from metasys types to C# types or define new types. Since it's not easy to create a new type that is an alias of an existing type (like say numbers) creating new types is not a great idea.


```

At the heart of the object model is the fact that while the client of a MetasysObject may know the exact type of each property the compiler doesn't and can't. (Unless we were to model each and every type in C#, or perhaps we could model the most common ones?)

If we were to model exact classes we could

1. Use the .h files to generate the C# classes
2. During deserialization we could detect the `objectType` and return the correct C# class

But without having specific types we could do the next thing which is define a set of "generic" classes.

for example "Value" classes would have a `PresentValue` property of type `T`. Does this buy us anything really?

Finally, it comes down to having to have a very nice `Variant` type. We could just use `Object` as the variant.


If we have a good `Variant` type it could have an interface for accessing it's value as well as it's metadata.
